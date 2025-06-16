import { Component } from '@angular/core';
import { Produto } from '../model/produto';
import { Cesta } from '../model/cesta';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../service/produto.service';
import { Item } from '../model/item';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vitrine.component.html',
  styleUrls: ['./vitrine.component.css']
})
export class VitrineComponent {
  mensagem: string = "";
  categoriaSelecionada: string = "";
  public lista: Produto[] =  [];

  categorias = [
    { id: "", nome: "Todas as Categorias" },
    { id: "escolar", nome: "Material Escolar" },
    { id: "escritorio", nome: "Escritório" },
    { id: "arte", nome: "Artes e Pintura" }
  ];

  constructor(private router: Router, private service: ProdutoService) {
    service.carregarVitrine().subscribe({
        next:(data)=>{
          this.mensagem = "";
          this.lista = data;
        },
        error:(error)=>{
          this.mensagem = "Ocorreu um erro, tente mais tarde!";
        }
      });
  }

  public filtrarPorCategoria(categoria: string) {
    this.categoriaSelecionada = categoria;
  }

  public getProdutosFiltrados() {
    if (!this.categoriaSelecionada) {
      return this.lista;
    }
    return this.lista.filter(p => p.categoria === this.categoriaSelecionada);
  }

  public carregar(obj: Produto) {
    localStorage.setItem("produto", JSON.stringify(obj));
    this.router.navigate(['/detalhe']);
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
