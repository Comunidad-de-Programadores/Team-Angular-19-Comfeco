import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    displayName : ['', Validators.required],
    email       : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    password    : ['', Validators.required],
    password1   : ['', Validators.required],
    terminos    : [ false , Validators.required],
  },{
    Validators: this.passwordIguales('password','password1')
  });

  constructor(private fb: FormBuilder, 
              private userService: UserService, 
              private  router: Router, 
              private toastr: ToastrService) { }


  registerUsuario() {
    this.formSubmitted = true;

    if (this.registerForm.invalid || !this.registerForm.get('terminos').value) {
      return;
    }
    this.userService.signUpUser(this.registerForm.value)
      .then( () => {
        this.toastr.success('Usuario Registrado Correctamente')
        this.router.navigateByUrl("/login")
        // console.log(this.registerForm.value);
      })
      .catch((e: Error)=>{
        // console.log(e.message);
        this.toastr.error(e.message);
      })
  }

  contrasenaValidos() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password1').value;

    if ((pass1 !== pass2) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

  campoNoValido(campo: string): boolean {

    if (this.registerForm.get(campo).touched && this.registerForm.get(campo).value === '' ) {
    return true;
    } else if (this.registerForm.get(campo).invalid && this.formSubmitted) {
    return true;
    } else {
      return false;
    }

  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }


  passwordIguales(pass1: string, pass2: string) {
    return ( formGroup: FormGroup) => {
        const pass1Control = formGroup.get(pass1);
        const pass2Control = formGroup.get(pass2);

        if (pass1Control.value === pass1Control.value) {
          pass2Control.setErrors(null);
        } else {
          pass2Control.setErrors({ noEsIgual: true });
        }
    }
  }

}
