import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss']
})
export class ListaClientesComponent implements OnInit {
 
  clientes: any[]=[];
  toastEliminar = true;

  constructor(private _ServiceClientes: ClientesService) { 
  }
  
  ngOnInit(): void {
  this.mostrarClientes();  
  }

  mostrarClientes(){
    this._ServiceClientes.showClientes().subscribe(data => {
      this.clientes =[];
      data.forEach((element:any)=>{
        //se accede al id de la coleccion
       /*console.log(element.payload.doc.data());*/
      this.clientes.push(
        {
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        }
      )
    });
    console.log(this.clientes);
    });
  }

  eliminarCliente(id: string){
    this.toastEliminar=true;
    this._ServiceClientes.deleteCliente(id).then(()=> {
      console.log("Cliente eliminado");
    }).catch(err=>{
      console.log(err);
    })
    this.toastEliminar=false;
  }

}
