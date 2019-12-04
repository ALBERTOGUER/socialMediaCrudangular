import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CRUDService } from '../../services/crud.service'
import { error } from 'util';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



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


  constructor(private service: CRUDService, private router: Router) { }

  ngOnInit() {
    this.crearFormulario();
    console.log(this.formulario);

  }

  public crearFormulario(): void {
    this.formulario = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(this.regexemail)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern(this.regexpassword)]),

    })

    // this.formulario.patchValue(this.data)


  }





  public loginservicecall(){
  
    console.log(this.formulario.value)

    let body = this.formulario.value

    this.service.loginUser(body).subscribe((data) => {
      console.log(data);
      localStorage.setItem("token", data['token']);
      this.router.navigate(['home'])



    }, (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.error.error}`,
        footer: '<a href>Why do I have this issue?</a>'
      })

    })


  }


}
