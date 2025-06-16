import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public mensagem: string = "";
  public obj: Cliente = new Cliente();

  // constructor(private router: Router) {}
  constructor(private service:ClienteService){}

  public entrar() {
    this.service.fazerLogin(this.obj).subscribe({
       next:(data)=>{
        if(data.codigo==0){
          this.mensagem = "Email ou senha invalidos!!!";
        } else {
          this.mensagem = "";
          localStorage.setItem("cliente", JSON.stringify(data));
          location.href = "cadastro";
        }
        },
        error:(error)=>{
          this.mensagem = "Ocorreu um erro, tente mais tarde!";
        } 
    });
  }
}
