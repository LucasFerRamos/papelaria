import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Produto } from '../model/produto';

@Component({
  selector: 'app-pedido',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent {
  public lista: Produto[] = [];
  public mensagem: string = '';
  public totalCesta: number = 0;
  public endereco: string = '';
  public numero: string = '';
  public complemento: string = '';
  public bairro: string = '';
  public cep: string = '';
  public cidade: string = '';
  public estado: string = '';
  public observacoes: string = '';
  public codigoPedido: number = 0;


  constructor(private router: Router) {
    let json = localStorage.getItem("cesta");
    if (json == null) {
      this.mensagem = "Cesta vazia.";
    } else {
      this.lista = JSON.parse(json);
      for(let item of this.lista){
        this.totalCesta = this.totalCesta + item.valor;
        
      } 
    }
  }
  finalizarPedido() {
    if (this.lista.length === 0) {
      this.mensagem = 'Não é possível finalizar um pedido com a cesta vazia.';
      return;
    }

    if (!this.endereco.trim() && !(this.numero.trim() && this.bairro.trim() && this.cep.trim() && this.cidade.trim() && this.estado.trim())) {
      this.mensagem = 'Por favor, preencha o endereço completo ou todos os campos de endereço.';
      return;
    }
    this.codigoPedido = 49659464566;
    this.limpar();
  }
  limpar(){
    localStorage.removeItem("cesta");
    this.lista = [];
    this.totalCesta = 0;
    this.endereco = '';
    this.numero = '';
    this.complemento = '';
    this.bairro = '';
    this.cep = '';
    this.cidade = '';
    this.estado = '';
    this.observacoes = '';
  }
}

