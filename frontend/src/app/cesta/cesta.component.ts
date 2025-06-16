import { Component } from '@angular/core';
import { Item } from '../model/item';
import { Produto } from '../model/produto';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.css']
})
export class CestaComponent {
  public lista: Produto[] = [];
  public mensagem: String = "";
  public totalCesta: number = 0;

  constructor() {
  
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

  limparCesta() {
    this.lista =[];
    localStorage.removeItem("cesta");
    this.mensagem = "Sua cesta foi limpa, não tem mais itens!";
  }
}
