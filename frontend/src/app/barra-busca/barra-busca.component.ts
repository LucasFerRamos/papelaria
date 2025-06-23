import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-barra-busca',
  imports: [FormsModule],
  templateUrl: './barra-busca.component.html',
  styleUrl: './barra-busca.component.css'
})
export class BarraBuscaComponent {
  public termoBusca : string = "";
   constructor(private router: Router) {}

    fazerBuscar(){
      localStorage.setItem("termoBusca", this.termoBusca);
      //  this.router.navigate(['/pesquisa']);
      location.href ="pesquisa";
  }

}
