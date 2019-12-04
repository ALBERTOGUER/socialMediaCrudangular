import { Component, OnInit, ɵɵresolveBody } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CRUDService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import { error } from 'util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formulario: FormGroup;
  private regexemail: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  private regexpassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\_\*])(?=.{8,})/;
  private data: {};


  constructor(private service: CRUDService, private router: Router) { }

  ngOnInit() {
    this.crearFormulario();
  }

  public crearFormulario(): void {
    this.formulario = new FormGroup({
      email: new FormControl('eve.holt@reqres.in', [Validators.required, Validators.pattern(this.regexemail)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern(this.regexpassword)]),
      confirmpassword: new FormControl(null)
    })
    this.formulario.controls.confirmpassword.setValidators([this.matchPasword.bind(this), Validators.required])
  }

  private matchPasword(control: FormControl): { [key: string]: boolean } {
    if (control.value == null) return null


    if (control.value != this.formulario.controls.password.value) {
      console.log('sfdhu ')
      return { diferente: true }
    }

    return null
  }



  public Registerservicecall() {

    console.log(this.formulario);
    delete this.formulario.value['confirmpassword'];


    this.service.registerUser(this.formulario.value).subscribe((data) => {
      console.log(data);
      Swal.fire({
    
        icon: 'success',
        title: 'User registered',
        showConfirmButton: false,
        timer: 1500
      })

      this.router.navigate(['login'])

    }, (error) => {
      console.log(error.error.error);
      

    })
  }

}
