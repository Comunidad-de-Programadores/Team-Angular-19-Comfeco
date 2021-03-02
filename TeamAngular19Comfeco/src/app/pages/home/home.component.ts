import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { IBadgesCollection } from 'src/app/class/IBadgeCollection';
import {ICommunitysCollection} from 'src/app/class/ICommunitysCollection';
import {IContentCreatorsCollection} from 'src/app/class/IContentCreatorsCollection';
import { ICountrySubCollection } from 'src/app/class/ICountrySubCollection';
import {IEventCollection} from 'src/app/class/IEventCollection';
import { IEventsCollection } from 'src/app/class/IEventsCollection';
import { IGenderSubCollection } from 'src/app/class/IGenderSubCollection';
import { IKnowledgeAreaSubCollection } from 'src/app/class/IKnowledgeAreaSubCollection';
import {ISponsorsCollection} from 'src/app/class/ISponsorsCollection';
import { User } from 'src/app/class/User';
import {DataService} from 'src/app/services/data.service';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  event: IEventCollection;
  communitys: ICommunitysCollection[];
  sponsors: ISponsorsCollection[];
  contentCreators: IContentCreatorsCollection[];

  //datos de prueba de tercera etapa
  countrys:ICountrySubCollection[] = [];
  genders:IGenderSubCollection[] = [];
  knowledges:IKnowledgeAreaSubCollection[] = [];
  events:IEventsCollection[] = [];
  badges:IBadgesCollection[] = [];

  constructor(public userService: UserService, private router: Router, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.getEvent();
    this.getCommunitys();
    this.getContentCreators();
    this.getSponsors();

    //Prueba de carga de datos
    this.getKnowledgeAreas();
    this.getGenders();
    this.getCountrys();
    this.getEvents();
    this.getBadges();
    setTimeout(() => {
      this.updateProfile();
    }, 5000);
  }

  cerrarSession(): void {
    try {
      this.userService.logoutUser();
      this.router.navigate(['/', 'login']);
    } catch (error) {

    }
  }

  async getCommunitys(): Promise<void> {
    try {
      this.communitys = await this.dataService.getCommunitys();
    } catch (error) {
      console.log(error.message);
    }
  }

  async getSponsors(): Promise<void> {
    try {
      this.sponsors = await this.dataService.getSponsors();
    } catch (error) {
      console.log(error.message);
    }
  }

  async getContentCreators(): Promise<void> {
    try {
      this.contentCreators = await this.dataService.getContentCreators();
    } catch (error) {
      console.log(error.message);
    }
  }

  async getEvent(): Promise<void> {
    try {
      this.event = await this.dataService.getEvent();
    } catch (error) {
      console.log(error.message);
    }
  }

  //metodos de prueba de datos
  async getKnowledgeAreas(): Promise<void> {
    try {
      this.knowledges = await this.dataService.getKnowledgeAreas();
      console.log("Conocimientos", this.knowledges)
    } catch (error) {
      console.log(error.message);
    }
  }

  getGenders(){
    this.genders = this.userService.getGenders();
    console.log("Generos", this.genders)
  }

  async getCountrys(){
    this.countrys = await this.dataService.getCountrys().toPromise();
    console.log("Paises", this.countrys)
  }

  async getEvents(){
    this.events = await this.dataService.getEvents();
    console.log("Eventos", this.events)
  }

  async getBadges(){
    this.badges = await this.dataService.getBadges();
    console.log("Badges", this.badges)
  }

  updateProfile(){
    try {
      let usuario:User = new User();
      usuario.uid = this.userService.user.uid;
      usuario.biography = "una biografia mas";
      usuario.country = this.countrys[10];
      usuario.dateOfBirth = "1992/07/11";
      usuario.displayName = "ErvinSV92";
      usuario.email = "ervinsv92@gmail.com";
      usuario.facebook = "facebook1";
      usuario.gender = this.genders[0];
      usuario.github = "github1";
      usuario.knowledgeArea.push(this.knowledges[0])
      usuario.knowledgeArea.push(this.knowledges[1])
      usuario.linkedin = "linkedin1";
      usuario.twitter = "twitter1";
      usuario.urlAvatar = "";
      usuario.password = "1234567";
      this.userService.updateUserProfile(usuario)  
    } catch (error) {
      console.error(error);
    }
  }
}
