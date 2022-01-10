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

  figangular: string;
  figreact: string;
  figvue: string;
  kotlin: string;
  figuracurso: string;

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
    // this.siteKey = '6LdZU2MdAAAAAKQ-nJN-UuYbfQ-f_SYvqmYxJ_AT';

    this.estiloBoton = 'desactivado';

    // this.figangular = '1eGYL_Z5wN2MvZjy52PhrmkbmvGwZ8Mad';
    // this.figreact = '19JGL0BpsgfDOr77DX6MS-xOTBXG04-by';
    // this.figvue = '1njGX79tnL8A4ioL1UDO0Cs5H9foMxTXO';
    // this.kotlin = '1w1dK5c-CN70zCc22sN3EM_4WgP89pX-5';
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
    //console.log(this.form);
    //this.buttionText = "Enviando...";
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
 }
/*
 asignaCosto(){
  if(this.cursoField.value == 'Angular'){
    this.costo = 300;
    this.figuracurso = this.figangular;
  }else if(this.cursoField.value == 'React'){
    this.costo = 230;
    this.figuracurso = this.figreact;
  }else if(this.cursoField.value == 'Vue'){
    this.costo = 250;
    this.figuracurso = this.figvue;
  }else {
    this.costo = 260;
    this.figuracurso = this.figreact;
  }
 }

 asignaDescuento(){
    if(this.personaField.value == 'Estudiante'){
      this.descuento = 50;
    }else if(this.personaField.value == 'Profesor'){
      this.descuento = 25;
    }else if(this.personaField.value == 'Profesional'){
      this.descuento = 0;
    }
 }

 calcCostoTotal(){
  this.costoTotal = this.costo - (this.costo*this.descuento)/100;
 }
*/
 register() {
  this.loading = true;  
  // this.asignaCosto();
  // this.asignaDescuento();
  // this.calcCostoTotal();
  this.buttionText = "Enviando...";
  /*  
  let user = {
    name: this.nameField.value,
    email: this.emailField.value,
    cedula: this.telefonoField.value, 
    sexo: this.sexoField.value,
    costo: this.costo,
    descuento: this.descuento,
    costoTotal: this.costoTotal,
    figuracurso: this.figuracurso
  }
  */
  
  this.save(event);

  /*
  this.http.sendEmail("http://localhost:3000/sendmail", user).subscribe(
    data => {
      let res:any = data; 
      console.log(
        `👏 > 👏 > 👏 > 👏 ${user.name} enviaste el correo con éxito con el id: ${res.messageId}`
      );
      setTimeout(() => {
        this.buttionText = "Enviado!";
      }, 2000);
    },
    err => {
      console.log(err);
      this.loading = false;
      this.buttionText = "Enviar";
    },() => {
      this.loading = false;
      this.buttionText = "Enviar";
    }
  );*/
  }

  //metodo para editar
  editarCliente(){
    this.rotuloCliente='Editar registro de Cliente';
    if(this.id !==null){
      this._ServiceClientes.getCliente(this.id).subscribe(data => {
        console.log(data);
      })
    }
  }

}


