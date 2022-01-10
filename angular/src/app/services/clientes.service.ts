import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {


  constructor( private bddFirestore : AngularFirestore) { }

  //servicio para agregar clientes 
  addCliente(clientes:any): Promise<any>{
    return this.bddFirestore.collection('clientes').add(clientes);
  }

  //servicio para mostrar clientes
  showClientes():Observable<any>{
    return this.bddFirestore.collection('clientes', referenciaOrden=>referenciaOrden.orderBy('yfechaAgregado','asc')).snapshotChanges();
  }

  //servicio para eliminar
  deleteCliente(id:string): Promise<any>{
    return this.bddFirestore.collection('clientes').doc(id).delete();
  }

  //servicio para actualizar
  getCliente(id:string):Observable<any>{
    return this.bddFirestore.collection('clientes').doc(id).snapshotChanges();
  }

  actualizarCliente(id: string, data: any): Promise<any>{
    return this.bddFirestore.collection('clientes').doc(id).update(data);
  }
}
