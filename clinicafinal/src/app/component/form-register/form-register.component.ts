import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FirebaseloginService } from 'src/app/service/firebaselogin/firebaselogin.service';
import { FirebaseregisterService } from 'src/app/service/firebaseregister/firebaseregister.service';
import { Usuario } from 'src/app/entidades/usuario/usuario';


@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent implements OnInit {

  public form!: FormGroup;
  public user!: Usuario;
  public seRegistroOk = false;
  private imgUno: any;
  private imgdos: any;
  public cargando: boolean = false;

  constructor(public fb: FormBuilder, public serviceLogin: FirebaseloginService,
    public serviceRegister: FirebaseregisterService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      'nombre': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15)])],
      'apellido': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15)])],
      'edad': [0, [Validators.required]],
      'dni': [0, [Validators.required]],
      'obrasocial': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15)])],
      'mail': ['asd123@gmail.com', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      'password': ['123456', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15)])],
      'imagenuno': new FormControl(Image,[Validators.required]),
      'imagendos': new FormControl(Image,[Validators.required]),
    });
  }

  aceptar() {

    this.cargando = true;

    const { nombre, apellido, edad, dni, obrasocial, password, mail, imagenuno, imagendos } = this.form.value;
    this.user = new Usuario();

    this.user.nombre = nombre;
    this.user.apellido = apellido;
    this.user.edad = edad;
    this.user.DNI = dni;
    this.user.obraSocial = obrasocial;
    this.user.password = password;
    this.user.mail = mail;
    console.log(imagenuno);
    this.user.imagenes = [this.imgUno, this.imgdos];
    this.user.tipo = 'paciente';

    const errorlbl = document.getElementById("errorLogin");
    if (errorlbl != null)
      this.serviceLogin.registrar(this.user.mail, this.user.password)
        .then((res) => {
          this.serviceRegister.createUsuario(this.user);
          this.serviceRegister.createPaciente(this.user.mail, this.user);
          this.seRegistroOk = true;
          this.cargando = false;
          this.form.reset();
        }).catch(err =>
          errorlbl.textContent = err.message)
  }

  UploadImag(event: any)
  {
    this.imgUno = event?.target.files[0];
    console.log(this.imgUno);
  }

  UploadImagDos(event: any)
  {
    this.imgdos = event?.target.files[0];
    console.log(this.imgdos);
  }

  get nombre() { return this.form.get('nombre'); }
  get apellido() { return this.form.get('apellido'); }
  get obrasocial() { return this.form.get('obrasocial'); }
  get mail() { return this.form.get('mail'); }

}
