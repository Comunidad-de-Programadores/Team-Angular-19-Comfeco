import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DataService } from '../../../services/data.service';
import { ICountrySubCollection } from 'src/app/class/ICountrySubCollection';
import { IGenderSubCollection } from 'src/app/class/IGenderSubCollection';
import { IKnowledgeAreaSubCollection } from 'src/app/class/IKnowledgeAreaSubCollection';
import { User } from 'src/app/class/User';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  countrys: ICountrySubCollection[] = [];
  genders: IGenderSubCollection[] = [];
  knowledges: IKnowledgeAreaSubCollection[] = [];
  formu:FormGroup;

  constructor(public userService: UserService, public dataService: DataService, private fb:FormBuilder) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.getCountrys();
    this.getGenders();
    this.getKnowledgeAreas();
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
      
    })
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

}
