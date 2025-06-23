import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-conta',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './conta.component.html',
  styleUrl: './conta.component.css'
})
export class ContaComponent {
    public obj: Cliente = new Cliente();
    public mensagem: String = "";
    public confirmaSenha: string = "";
    

  public constructor(private router: Router, private service: ClienteService) {
    let json = localStorage.getItem("cliente");
    if(json!=null){
      this.obj = JSON.parse(json);
    }
  }
  public alterar(){
   this.service.alterar(this.obj).subscribe({
       next:(data)=>{
          this.mensagem = "Cliente atualizado com sucesso!";
        },
        error:(error)=>{
          this.mensagem = "Ocorreu um erro, tente mais tarde!";
        } 
    });
 }

 public limpar(){
  this.obj.nome = "";
  this.obj.email = "";
  this.obj.telefone = "";
  this.obj.cpf = "";
  this.obj.senha = "";
 }
 public retornar(){
  this.router.navigate(["/cadastro"]);
 }

 public remover(){
    this.service.apagar(this.obj).subscribe({
       next:(data)=>{
          this.limpar();
          this.mensagem = "Cliente removido com sucesso!";
        },
        error:(error)=>{
          this.mensagem = "Ocorreu um erro, tente mais tarde!";
        } 
    });
  }
}
