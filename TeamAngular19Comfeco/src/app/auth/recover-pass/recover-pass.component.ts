import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recover-pass',
  templateUrl: './recover-pass.component.html',
  styleUrls: ['./recover-pass.component.css']
})
export class RecoverPassComponent implements OnInit {

  formu:FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService, private toastr: ToastrService) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.formu = this.fb.group({
      email:['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    })
  }

  get emailNoValido(){
    return this.formu.get('email').invalid && this.formu.get('email').touched;
  }

  async recuperar(){
    if(this.formu.invalid){
      return Object.values(this.formu.controls).forEach(control =>{
        control.markAsTouched();
      });
    }
    try{
      let correo = this.formu.controls.email.value;
      await this.userService.sendPasswordResetEmail(correo);
      this.toastr.success('Se ha enviado el correo', 'Éxitos');
    }catch(error){
      this.toastr.error(error.message, 'Error');
    }
  }
}
