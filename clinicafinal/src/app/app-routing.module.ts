import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { AdminGuard } from './guards/admin/admin.guard';

const routes: Routes =
  [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'registrar', component: RegisterComponent},
    {path: 'ingresar', component: LoginComponent},
    {path: 'usuarios', component: UsuariosComponent,
     canActivate:[AdminGuard]}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
