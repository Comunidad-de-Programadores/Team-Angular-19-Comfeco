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
import { TypeBadges } from 'src/app/enum/TypesEnum';
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
    /* this.getKnowledgeAreas();
    this.getGenders();
    this.getCountrys();
    this.getEvents();
    this.getBadges(); */
    /* this.setBadgeByUser(this.userService.user.uid, TypeBadges.activa);
    this.getBadgesByUser(this.userService.user.uid);
    this.getGroupOfUser(this.userService.user.uid);
    this.getLanguajes();
    this.getGroups('');
    this.getGroups('JS');
    this.setUserToGroup('vdjrSa5USOQQEdpgF9TAlWDvOws2', 'kpNeCQfeY8j5kIyl5mJh')
    this.quitUserOfGroup('vdjrSa5USOQQEdpgF9TAlWDvOws2', 'kpNeCQfeY8j5kIyl5mJh')
    this.setUserToEvent('3BkAbg0taoeZ6xsBbZdn7mUZAFg1', 'FfSeoUvtaTbmrQG6XYij');
    this.getEventsOfUser('3BkAbg0taoeZ6xsBbZdn7mUZAFg1');
    this.getEvents(); */
    this.getEventsOfUser(this.userService.user.uid);
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
  setBadgeByUser(uid:string, typeBadge:string){
    try {
      this.dataService.setBadgeToUserByType(uid, typeBadge)  
    } catch (error) {
      console.error("Set insignias", error)
    }
  }

  async getBadgesByUser(uid:string){
    try {
      let insigniasUsuario = await this.dataService.getBadgesByUser(uid)  
      console.log("Insignias por usuario", insigniasUsuario)
    } catch (error) {
      console.error("Set insignias", error)
    }
  }

  async getGroupOfUser(uid:string){
    try {
      let group = await this.dataService.getGroupOfUser(uid);
      console.log("Grupo del usuario", group);

      let usuarios = await this.dataService.getUsersOfGroup(group.idUsers);
      console.log("Usuarios del grupo", usuarios);
    } catch (error) {
      console.error(error)
    }
  }

  getLanguajes(){
    let languajes = this.dataService.getLanguajes();
    console.log("languajes", languajes)
  }

  async getGroups(languaje:string){
    try {
      let groups = await this.dataService.getGroups(languaje);
      console.log("Grupos: " + languaje, groups);
    } catch (error) {
      console.error(error)
    }
  }

  async setUserToGroup(uid:string, idGroup:string){
    try {
      console.log("agregar")
      await this.dataService.setUserToGroup(uid, idGroup);
    } catch (error) {
      console.error(error)
    }
  }

  async quitUserOfGroup(uid:string, idGroup:string){
    try {
      console.log("quitar")
      await this.dataService.quitUserOfGroup(uid, idGroup);
    } catch (error) {
      console.error(error)
    }
  }

  async setUserToEvent(uid:string, idEvent:string){
    try {
      await this.dataService.setUserToEvent(uid, idEvent);
    } catch (error) {
      console.error(error.message)
    }
  }

  async getEventsOfUser(uid:string){
    try {
      let eventsOfUser = await this.dataService.getEventsOfUser(uid);
      console.log("Events of user", eventsOfUser);
    } catch (error) {
      console.error(error.message)
    }
  }

  async getEvents(){
    try{
      let events = await this.dataService.getEvents();
      console.log("Eventos: ",events);
    }catch(error){
      console.log(error);
    }
  }
}
