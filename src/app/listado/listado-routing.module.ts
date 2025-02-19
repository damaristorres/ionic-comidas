import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoPage } from './listado.page';
import { PedidosPage } from '../pedidos/pedidos.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoPageRoutingModule {}
