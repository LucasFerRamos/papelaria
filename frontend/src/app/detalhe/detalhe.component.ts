import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { Cesta } from '../model/cesta';
import { Item } from '../model/item';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent {
  public obj: Produto = new Produto();
  public mensagem: string = "";

  constructor(private router: Router) {
    const json = localStorage.getItem("produto");
    if (json === null) {
      this.mensagem = "Produto não encontrado! Verifique.";
    } else {
      this.obj = JSON.parse(json);
    }
  }

  public comprar(obj: Produto) {
  let lista: Item[] = [];
  const json = localStorage.getItem("cesta");

  if (json !== null) {
    lista = JSON.parse(json);
  }


  let novo: Item = new Item();
  novo.codigo = obj.codigo;
  novo.nome = obj.nome;
  novo.valor = obj.valorPromo < obj.valor ? obj.valorPromo : obj.valor;
  novo.qtd = 1;
  novo.total = novo.valor;
  novo.imagem = obj.imagem;

  
  lista.push(novo);

    localStorage.setItem("cesta", JSON.stringify(lista));

    this.router.navigate(['/cesta']);
  }
}
