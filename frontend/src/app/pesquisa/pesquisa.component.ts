import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { Item } from '../model/item';
import { ProdutoService } from '../service/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pesquisa',
  imports: [CommonModule],
  templateUrl: './pesquisa.component.html',
  styleUrl: './pesquisa.component.css'
})
export class PesquisaComponent {
  mensagem: string = "";
  public lista: Produto[] =  [];
  public termoBusca:String="";

  constructor(private router: Router, private service: ProdutoService) 
  {
    let json = localStorage.getItem("termoBusca");
    if(json!=null){
        this.termoBusca = json;
       service.fazerBusca(this.termoBusca).subscribe({
        next:(data)=>{
          this.mensagem = "";
          this.lista = data;
        },
        error:(error)=>{
          this.mensagem = "Ocorreu um erro, tente mais tarde!";
        }
      });
    } else {
      this.mensagem = "termo busca não definido !;"
    }
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
