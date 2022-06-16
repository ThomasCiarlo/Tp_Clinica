import { Component, OnInit } from '@angular/core';
import { EspecialidadesService } from 'src/app/service/especialidade/especialidades.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FirebaseloginService } from 'src/app/service/firebaselogin/firebaselogin.service';
import { FirebaseregisterService } from 'src/app/service/firebaseregister/firebaseregister.service';
import { Usuario } from 'src/app/entidades/usuario/usuario';

@Component({
  selector: 'app-form-register-especialista',
  templateUrl: './form-register-especialista.component.html',
  styleUrls: ['./form-register-especialista.component.css']
})
export class FormRegisterEspecialistaComponent implements OnInit {

  public form!: FormGroup;
  public user!: Usuario;
  public seRegistroOk = false;
  private imgUno: any;
  public cargando: boolean = false;

  constructor(public serviceEspecialidad: EspecialidadesService, public fb: FormBuilder, public serviceLogin: FirebaseloginService,
    public serviceRegister: FirebaseregisterService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      'nombre': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15)])],
      'apellido': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15)])],
      'edad': [0, [Validators.required]],
      'dni': [0, [Validators.required]],
      'mail': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15)])],
      'especialidad': ['', Validators.nullValidator],
      'imagenuno': ['', Validators.nullValidator],
      'nuevaEspecialidad': ['', Validators.nullValidator],
    });
  }

  aceptar() {

    const { nombre, apellido, edad, dni,password, mail, imagenuno } = this.form.value;
    this.user = new Usuario();

    this.user.nombre = nombre;
    this.user.apellido = apellido;
    this.user.edad = edad;
    this.user.DNI = dni;
    this.user.password = password;
    this.user.mail = mail;
    this.user.especialidad = this.form.value.especialidad;
    if(this.form.value.nuevaEspecialidad != "")
      this.user.especialidad = this.form.value.nuevaEspecialidad
    this.user.imagenes = [this.imgUno];
    this.user.tipo = 'especialista';
    this.user.habilitado = false;
    this.user.franjaHoraria = [];
    this.user.franjaHoraria.push(0);
    this.user.franjaHoraria.push(0);

    const errorlbl = document.getElementById("errorLogin");
    if (errorlbl != null)
      this.serviceLogin.registrar(this.user.mail, this.user.password)
        .then((res) => {        
          if(this.form.value.nuevaEspecialidad != "")
          {
            console.log(this.user.especialidad);
            this.serviceRegister.crearEspecialidad(this.form.value.nuevaEspecialidad);
          }
          this.serviceRegister.createUsuario(this.user);
          this.serviceRegister.createEspecialista(this.user.mail, this.user);
          this.seRegistroOk = true;
          this.form.reset();
        }).catch(err =>
          errorlbl.textContent = err.message)

  }

  UploadImag(event: any)
  {
    this.imgUno = event?.target.files[0];
  }

  get nombre() { return this.form.get('nombre'); }
  get apellido() { return this.form.get('apellido'); }
  get obrasocial() { return this.form.get('obrasocial'); }
  get mail() { return this.form.get('mail'); }

}
