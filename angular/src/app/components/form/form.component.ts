import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs/operators';
import { HttpService } from "../../Shared/http.service";
import { myValidation } from '../customvalidators.directive';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  siteKey!: string;
  form!: FormGroup;

  loading = false;
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
    public http: HttpService
    ) {

    this.buildForm();
    this.siteKey = '6LdZU2MdAAAAAKQ-nJN-UuYbfQ-f_SYvqmYxJ_AT';

    this.estiloBoton = 'desactivado';

    this.figangular = '1eGYL_Z5wN2MvZjy52PhrmkbmvGwZ8Mad';
    this.figreact = '19JGL0BpsgfDOr77DX6MS-xOTBXG04-by';
    this.figvue = '1njGX79tnL8A4ioL1UDO0Cs5H9foMxTXO';
    this.kotlin = '1w1dK5c-CN70zCc22sN3EM_4WgP89pX-5';
   }

   ngOnInit() {
    console.log(this.http.test);
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      cedula: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      email: ['', [Validators.email, Validators.required]],
      persona: ['', [Validators.required]],
      curso: ['', [Validators.required]],
      recaptcha: ['', [Validators.required]]
    });
  }

  save(event: Event){
    this.estiloBoton = 'activado';
    event.preventDefault();
    console.log("Enviar");
    if(this.form.valid){
      this.estiloBoton = 'activado';
      const value = this.form.value;
      console.log(value);
    }else{
      this.estiloBoton = 'activado';
      this.emailField?.markAsDirty;
      this.nameField?.markAsDirty;
      this.cedulaField?.markAsDirty;
      this.personaField?.markAsDirty;
      this.cursoField?.markAsDirty;
    }
    this.estiloBoton = 'activado';
  }

  get emailField(){
    return this.form.get('email');
  }
  get cedulaField(){
    return this.form.get('cedula');
  }
  get nameField(){
    return this.form.get('name');
  }
  get personaField(){
    return this.form.get('persona');
  }
  get cursoField(){
    return this.form.get('curso');
  }
  get recaptchaField(){
    return this.form.get('recaptcha');
  }

  limpiar(){
    this.form.patchValue( { name: '', cedula: '', email:'', persona: '', curso:'' });
     console.log(this.form);
     this.form.reset;
 }

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

 register() {
  this.loading = true;  
  this.asignaCosto();
  this.asignaDescuento();
  this.calcCostoTotal();
  this.buttionText = "Enviando...";
  let user = {
    name: this.nameField.value,
    email: this.emailField.value,
    cedula: this.cedulaField.value,
    persona: this.personaField.value,
    curso: this.cursoField.value,
    costo: this.costo,
    descuento: this.descuento,
    costoTotal: this.costoTotal,
    figuracurso: this.figuracurso
  }
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
  );
}

}


