import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formulario: FormGroup;
  private regexemail: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  private regexpassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\_\*])(?=.{8,})/;
  private data: {};
  constructor() { }

  ngOnInit() {
    this.crearFormulario();
  }

  public crearFormulario(): void {
    this.formulario = new FormGroup({
      user: new FormControl(null, [Validators.required, Validators.pattern(this.regexemail)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern(this.regexpassword)]),
      confirmpassword: new FormControl(null)
    })
    
    // this.formulario.patchValue(this.data)
    // this.formulario.controls.confirmpassword.setValidators(this.matchPasword.bind(this))

  }

  public verestadoform() {

   
    console.log(this.formulario);

    console.log(this.formulario.value);
    this.data = this.formulario.value;
    console.log(this.data);
    

  }

  // private matchPasword(control: FormControl): { [key: string]: boolean } {

  //   if (control.value != this.formulario.controls.password.value) return {diferente:true}
  //     return null
  // }

}
