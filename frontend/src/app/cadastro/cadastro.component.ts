import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  public obj: Cliente = new Cliente();
  public mensagem: String = "";
  public confirmaSenha: string = "";

  public constructor(private service: ClienteService) {
    let json = localStorage.getItem("cliente");
    if(json!=null){
      this.obj = JSON.parse(json);
    }
  }


  public gravar() {
    this.service.gravar(this.obj).subscribe({
       next:(data)=>{
          this.mensagem = "Cliente cadastrado com sucesso!";
        },
        error:(error)=>{
          this.mensagem = "Ocorreu um erro, tente mais tarde!";
        } 
    });

    // setTimeout(() => {
    //   this.router.navigate(['/login']);
    // }, 2000);
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
