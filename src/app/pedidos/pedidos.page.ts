import { Component, OnInit } from '@angular/core';
import { PedidosI } from './pedidos.interface';
import { PedidosService } from './pedidos.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  pedido: PedidosI = {
    pedidos: '',
    prioridad: '',
    // imagen: ''
  };

  pedidoId = null;

  constructor(
    private route: ActivatedRoute,
    private nav: NavController,
    private pedidosService: PedidosService,
    private loadingController: LoadingController
    ) { }

  ngOnInit() {
    this.pedidoId = this.route.snapshot.params['id'];
    if(this.pedidoId){
      this.loadPedido();
    }
  }

  async loadPedido(){
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    })
    await loading.present();
    this.pedidosService.getPedido(this.pedidoId).subscribe(res => {
      loading.dismiss();
      this.pedido = res;
    })
  }

  async savePedido(){
    const loading = await this.loadingController.create({
      message: 'Guardando...'
    });

    await loading.present();
    
    if(this.pedidoId){
      this.pedidosService.updatePedido(this.pedido, this.pedidoId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/listado');
      });
    }else{
      this.pedidosService.addPedido(this.pedido).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/listado');
        }
      );
    }
  }

  onRemove(idPedido: string){
    console.log(idPedido);
    this.pedidosService.deletePedido(idPedido);
  }

  // async ImagenUpload(event: any){
  //   const path = 'Pedidos';
  //   const name = 'prueba';
  //   const file = event.target.files[0];
  //   const res = await this.pedidosService.uploadImagen(file, path, name);
  //   console.log('recibi res de la promesa', res);
  //   console.log('fin de la funcion -> ImagenUpload');

  // }



}