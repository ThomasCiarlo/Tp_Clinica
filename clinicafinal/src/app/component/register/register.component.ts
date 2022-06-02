import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  mostrarRegister = false;
  tipo = "";

  constructor() { }

  ngOnInit(): void {
  }

}
