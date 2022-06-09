import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AdminGuard } from './guards/admin/admin.guard';
import { PacientesGuard } from './guards/pacientes.guard';
import { UsuariosModule } from './modules/usuarios/usuarios.module';

const routes: Routes =
  [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'registrar', component: RegisterComponent },
    { path: 'ingresar', component: LoginComponent },
    {
      path: 'usuarios', loadChildren: () => import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule),
      canActivate: [AdminGuard]
    },
  { path: 'pacientes', loadChildren: () => import('./modules/pacientes/pacientes.module').then(m => m.PacientesModule),
    canActivate: [PacientesGuard], },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
