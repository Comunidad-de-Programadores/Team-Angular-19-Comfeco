import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    displayName : ['test1', Validators.required],
    email       : ['test1@gmail.com', [ Validators.required, Validators.email ]],
    password    : ['123456', Validators.required],
    password1   : ['123456', Validators.required],
    terminos    : [ true , Validators.required],
  },{
    Validators: this.passwordIguales('password','password1')
  });

  constructor(private fb: FormBuilder, private userService: UserService, private  router: Router) { }


  registerUsuario() {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.userService.signUpUser(this.registerForm.value)
      .then( () => {
        this.router.navigateByUrl("/login")
        // console.log(this.registerForm.value);
      })
      .catch((e: Error)=>{
        console.log(e.message);
        // this.toastr.error(e.message);
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
