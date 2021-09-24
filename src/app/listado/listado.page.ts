import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppPage } from 'e2e/src/app.po';
import { PedidosI } from '../pedidos/pedidos.interface';
import { PedidosService } from '../pedidos/pedidos.service';


@Component({
  selector: 'app-listado',
  templateUrl: 'listado.page.html',
  styleUrls: ['listado.page.scss'],
})
export class ListadoPage implements OnInit{

  pedidos: PedidosI[];
  
  constructor(private pedidosService: PedidosService){}

  ngOnInit(){
      this.pedidosService.getPedidos().subscribe(res => this.pedidos = res);
  }

  onRemove(pedidosId: string){
    console.log(pedidosId);
    this.pedidosService.deletePedido(pedidosId);
  }

}
