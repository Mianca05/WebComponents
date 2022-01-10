import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounce, debounceTime } from 'rxjs/operators';
import { ClientesService } from 'src/app/services/clientes.service';
import { HttpService } from "../../Shared/http.service";
import { myValidation } from '../customvalidators.directive';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  // siteKey!: string;
  form!: FormGroup;
  loading = false;
  spinner=false;
  id: string | null;
  rotuloCliente='Registro de nuevos Clientes';

  buttionText = "Enviar";
  
  descuento: number;
  costo: number;
  costoTotal: number;

  estiloBoton: string;

  constructor(
    private formBuilder: FormBuilder,
    public http: HttpService,
    //se incorpora el servicio clientes
    private _ServiceClientes: ClientesService,
    //rediccion al componente principal
    private returnRuta:Router,
    //clase par acceder al ID de la coleccion.  
    private aRoute: ActivatedRoute 
    ) {

    //obtener ID
    this.id= this.aRoute.snapshot.paramMap.get('id');
    
    this.buildForm();

    this.estiloBoton = 'desactivado';
   }

   ngOnInit() {
    // console.log(this.http.test);
    this.editarCliente();
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      name: ['', [Validators.required ]],
      telefono: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      email: ['', [Validators.email, Validators.required]],
      sexo: ['', [Validators.required]]
    });
  
  }


  save(event: Event){
    this.estiloBoton = 'activado';
    event.preventDefault();
    console.log("Enviar");
    if(this.form.valid){
      this.estiloBoton = 'activado';
      const value = this.form.value;
      const cliente = {
        name: this.nameField.value,
        email: this.emailField.value,
        telefono: this.telefonoField.value, 
        sexo: this.sexoField.value,
        yfechaAgregado: new Date(),
        zfechaActualizacion:  new Date()
      }
      this.spinner =true;
      this._ServiceClientes.addCliente(cliente).then(() => {
        console.log("registro agregado");
        this.spinner = false;
        this.returnRuta.navigate(['/lista-clientes'])
      }).catch(err =>{
        console.log(err);
        this.spinner = false;
      })
      
      setTimeout(() => {
        this.buttionText = "Enviado!";
      }, 2000);
/*Agregar un metodo que limpie campos sin mostrar errores cuando los datos se hayan enviado*///      this.limpiar();
      console.log(value);
    }else{
      this.loading = false;
      this.buttionText = "Enviar";
      this.estiloBoton = 'activado';
      this.emailField?.markAsDirty;
      this.nameField?.markAsDirty;
      this.telefonoField?.markAsDirty;
      this.sexoField?.markAsDirty;
      
    }
    this.estiloBoton = 'activado';
  }

  
  get nameField(){
    return this.form.get('name');
  }
  get telefonoField(){
    return this.form.get('telefono');
  }
  get emailField(){
    return this.form.get('email');
  }
  get sexoField(){
    return this.form.get('sexo');
  }

  limpiar(){
    this.form.patchValue( { name: '', telefono: '', email:'', sexo: '' });
     console.log(this.form);
     this.form.reset;
     this.returnRuta.navigate(['/lista-clientes'])
 }

 agregarEditarCliente(){
    this.estiloBoton = 'activado';
    event.preventDefault();
    console.log("Enviar");
    if(this.form.valid){
      this.estiloBoton = 'activado';
      const value = this.form.value;
      const cliente = {
        name: this.nameField.value,
        email: this.emailField.value,
        telefono: this.telefonoField.value, 
        sexo: this.sexoField.value,
        yfechaAgregado: new Date(),
        zfechaActualizacion:  new Date()
      }
      this.spinner =true;
      this._ServiceClientes.addCliente(cliente).then(() => {
        console.log("registro agregado");
        this.spinner = false;
        this.returnRuta.navigate(['/lista-clientes'])
      }).catch(err =>{
        console.log(err);
        this.spinner = false;
      })
      
      setTimeout(() => {
        this.buttionText = "Enviado!";
      }, 2000);
  /*Agregar un metodo que limpie campos sin mostrar errores cuando los datos se hayan enviado*///      this.limpiar();
      console.log(value);
    }else{
      this.loading = false;
      this.buttionText = "Enviar";
      this.estiloBoton = 'activado';
      this.emailField?.markAsDirty;
      this.nameField?.markAsDirty;
      this.telefonoField?.markAsDirty;
      this.sexoField?.markAsDirty;
      
    }
    this.estiloBoton = 'activado';
 }

  register() {
    this.loading = true;  
    this.buttionText = "Enviando...";
    
    if(this.id == null){
      this.save(event);
    }else{
      this.editarClientes(this.id);
    }

  }

  //metodo actualizar el cliente
  editarClientes(id: string){
    this.loading = true;
    const cliente = {
      name: this.nameField.value,
      email: this.emailField.value,
      telefono: this.telefonoField.value, 
      sexo: this.sexoField.value,
      zfechaActualizacion: new Date()
    }
    this._ServiceClientes.actualizarCliente(id, cliente).then(() => {
      this.loading = false;
      console.log('Empleado modificado');
      this.returnRuta.navigate(['/lista-clientes']);
    })
  }

  //metodo para mostrar los datos en el formulario
  editarCliente(){
    this.rotuloCliente='Editar registro de Cliente';
    if(this.id !==null){
      this.loading = true;
      this._ServiceClientes.getCliente(this.id).subscribe(data => {
        this.loading = false;
        console.log(data.payload.data()['name']);
        this.form.setValue({
          name: data.payload.data()['name'],
          email: data.payload.data()['email'],
          sexo: data.payload.data()['sexo'],
          telefono: data.payload.data()['telefono']
        })
      })
    }
  }

}


