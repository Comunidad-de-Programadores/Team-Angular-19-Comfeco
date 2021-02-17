import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/class/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  constructor(private fb:FormBuilder, private userService:UserService, private router:Router) {
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  get emailNoValido(){
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get passNoValido(){
    return this.form.get('pass').invalid && this.form.get('pass').touched;
  }

  crearFormulario(){
    this.form = this.fb.group({
      email:['', Validators.required],
      pass:['', Validators.required],
    })
  }

  async login(){
    if(this.form.invalid){
      return Object.values(this.form.controls).forEach(control =>{
          control.markAsTouched();
      });
    }
    let user = new User();
    user.email = this.form.controls.email.value;
    user.password = this.form.controls.pass.value;

    try {
      let usuario:User = await this.userService.signInUser(user);  

      if(usuario.emailVerified){
        this.router.navigate(['/private', 'home']);
      }else{
        alert("Debe verificar el email para continuar")
      }
      
    } catch (error) {
      alert(error.message)
    }
  }

  resetForm(){
    this.form.reset();
  }
}
