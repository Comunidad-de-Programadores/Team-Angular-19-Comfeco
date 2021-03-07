import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import { DataService } from '../../../services/data.service';
import { ICountrySubCollection } from 'src/app/class/ICountrySubCollection';
import { IGenderSubCollection } from 'src/app/class/IGenderSubCollection';
import { IKnowledgeAreaSubCollection } from 'src/app/class/IKnowledgeAreaSubCollection';
import { User } from 'src/app/class/User';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  countrys: ICountrySubCollection[] = [];
  genders: IGenderSubCollection[] = [];
  knowledges: IKnowledgeAreaSubCollection[] = [];
  formu:FormGroup;
  public formSubmitted = false;

  constructor(public userService: UserService, public dataService: DataService, private fb:FormBuilder) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.getCountrys();
    this.getGenders();
    this.getKnowledgeAreas();
    console.log('Area: ',this.userService.user.knowledgeArea[0].id,this.userService.user.knowledgeArea[0].description);
  }

  crearFormulario(){
    this.formu = this.fb.group({
      nick:[this.userService.user.displayName],
      email:[this.userService.user.email],
      especialidad:[''],
      genero:[''],
      fechanacimiento:[''],
      pais:[''],
      contra:[this.userService.user.password],
      facebook:[''],
      github:[''],
      linkedin:[''],
      twitter:[''],
      biografia:['',Validators.maxLength(140)]
      
    },
    {
      Validators: this.passwordIguales("contra","contra2")
    });
  }

  async getCountrys(){
    this.countrys = await this.dataService.getCountrys().toPromise();
  }

  getGenders(){
    this.genders = this.userService.getGenders();
    //console.log("Generos", this.genders)
  }

  async getKnowledgeAreas(): Promise<void> {
    try {
      this.knowledges = await this.dataService.getKnowledgeAreas();
//      console.log("Conocimientos", this.knowledges)
    } catch (error) {
      console.log(error.message);
    }
  }

  actualizar(){
      try {
        let usuario:User = new User();
        console.log(this.formu.controls.pais.value);
        usuario.uid = this.userService.user.uid;
        usuario.biography = this.formu.controls.biografia.value;
        usuario.country =this.countrys.find(x => x.numericCode == this.formu.controls.pais.value);
        usuario.dateOfBirth = this.formu.controls.fechanacimiento.value;
        usuario.displayName = this.formu.controls.nick.value;
        usuario.email = this.formu.controls.email.value;
        usuario.facebook = this.formu.controls.facebook.value;
        usuario.gender = this.genders.find(x => x.code == this.formu.controls.genero.value);
        usuario.github = this.formu.controls.github.value;
        usuario.knowledgeArea.push(this.knowledges.find(x=>x.id == this.formu.controls.especialidad.value));
        usuario.linkedin = this.formu.controls.linkedin.value;
        usuario.twitter = this.formu.controls.twitter.value;
        usuario.urlAvatar = "";
        usuario.password = this.formu.controls.contra.value;
        console.log('usuario:',usuario);
        this.userService.updateUserProfile(usuario)  
      } catch (error) {
        console.error(error);
    }
  }


  contrasenaValidos() {
    const pass1 = this.formu.get('contra').value;
    const pass2 = this.formu.get('contra2').value;

    if ((pass1 !== pass2) && this.formSubmitted && this.formu.get('contra').touched) {
      return true;
    } else {
      return false;
    }

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
