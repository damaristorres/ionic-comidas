import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppPage } from 'e2e/src/app.po';
import { PedidosI } from '../pedidos/pedidos.interface';
import { PedidosService } from '../pedidos/pedidos.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  pedidos: PedidosI[];
  
  constructor(private pedidosService: PedidosService){}

  ngOnInit(){
    this.pedidosService.getPedidos().subscribe( res => {
      this.pedidosService.getPedidos().subscribe(res => this.pedidos = res);
    });
  }

}
