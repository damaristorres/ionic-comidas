import { Injectable } from "@angular/core";
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getLocaleFirstDayOfWeek } from "@angular/common";
import { PedidosI } from "./pedidos.interface";
import { AngularFireStorage } from "@angular/fire/storage";

@Injectable({
    providedIn: 'root'
})

export class PedidosService {

    private pedidosCollection: AngularFirestoreCollection<PedidosI>;
    private pedidos: Observable<PedidosI[]>;

    constructor(
        // public storage: AngularFireStorage,
        db: AngularFirestore
        ){
        this.pedidosCollection = db.collection<PedidosI>('pedidos');
        this.pedidos =  this.pedidosCollection.snapshotChanges().pipe(map(
            actions => {
                return actions.map( a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            }
        ));
    }

    getPedidos(){
        return this.pedidos;
    }

    getPedido(id: string){
        return this.pedidosCollection.doc<PedidosI>(id).valueChanges();
    }

    updatePedido(pedido: PedidosI, id: string){
        return this.pedidosCollection.doc(id).update(pedido);
    }

    addPedido(pedido: PedidosI){
        return this.pedidosCollection.add(pedido);
    }

    deletePedido(id: string){
        return this.pedidosCollection.doc(id).delete();
    }

    // uploadImagen(file: any, path: string, nombre: string): Promise<string>{
    //     return new Promise( res => {
    //         const filePath = path + '/' + nombre;
    //         const ref = this.storage.ref(filePath);
    //         const pedido = ref.put(file);
    //         res('Este es el enlace');
    //     });
    // }
}
