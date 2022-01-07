import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';

const routes: Routes = [
  // redireccion de inicio de pagina
  { path:'', redirectTo: 'lista-clientes', pathMatch:'full'},
  { path: 'lista-clientes', component: ListaClientesComponent},
  { path: 'form', component: FormComponent},
  { path:'**', redirectTo: 'lista-clientes', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
