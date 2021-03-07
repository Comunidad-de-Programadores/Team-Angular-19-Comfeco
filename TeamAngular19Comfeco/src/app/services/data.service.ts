import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICommunitysCollection } from '../class/ICommunitysCollection';
import { IContentCreatorsCollection } from '../class/IContentCreatorsCollection';
import { IEventCollection } from '../class/IEventCollection';
import { IKnowledgeAreaSubCollection } from '../class/IKnowledgeAreaSubCollection';
import { ISponsorsCollection } from '../class/ISponsorsCollection';
import { CollectionEnum } from '../enum/CollectionEnum';
import { ICountrySubCollection } from '../class/ICountrySubCollection';
import { Observable } from 'rxjs';
import { IEventsCollection } from '../class/IEventsCollection';
import { IBadgesCollection } from '../class/IBadgeCollection';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore:AngularFirestore, private http: HttpClient) { }

  async getCommunitys():Promise<ICommunitysCollection[]>{
    return await (await this.firestore.collection<ICommunitysCollection>(CollectionEnum.communitys).get().toPromise()).docs.map((res)=>{
      let data = res.data();
      let comunidad:ICommunitysCollection = {
        id:data.id,
        name:data.name,
        urlImage:data.urlImage,
        url:data.url
      }
      return comunidad;
    });
  }

  async getSponsors():Promise<ISponsorsCollection[]>{
    return await (await this.firestore.collection<ISponsorsCollection>(CollectionEnum.sponsors).get().toPromise()).docs.map((res)=>{
      let data = res.data();
      let sponsor:ISponsorsCollection = {
        id:data.id,
        name:data.name,
        urlImage:data.urlImage
      }
      return sponsor;
    });
  }

  async getContentCreators():Promise<IContentCreatorsCollection[]>{
    return await (await this.firestore.collection<IContentCreatorsCollection>(CollectionEnum.contentCreators).get().toPromise()).docs.map((res)=>{
      let data = res.data();
      let contentCreator:IContentCreatorsCollection = {
        id:data.id,
        name:data.name,
        urlImage:data.urlImage,
        urlLanguajeLogo:data.urlLanguajeLogo
      }
      return contentCreator;
    });
  }

  async getEvent():Promise<IEventCollection>{
    let event = await (await this.firestore.collection<IEventCollection>(CollectionEnum.event, ref => ref.limit(1)).get().toPromise()).docs.map((res)=>{
      let data = res.data();
      let event:IEventCollection = {
        id:data.id,
        day:data.day,
        hour:data.hour,
        month:data.month,
        titlePhase:data.titlePhase,
        year:data.year
      }
      return event;
    });
    return event[0];
  }

  async getKnowledgeAreas():Promise<IKnowledgeAreaSubCollection[]>{
    let knowledges = await (await this.firestore.collection<IKnowledgeAreaSubCollection>(CollectionEnum.knowledgeArea).get().toPromise()).docs.map((res)=>{
      let data = res.data();
      let knowledgeArea:IKnowledgeAreaSubCollection = {
        id:data.id,
        description:data.description
      }
      return knowledgeArea;
    });

    knowledges.unshift({
      id:'',
      description:'Seleccione...'
    });

    return knowledges;
  }

  getCountrys():Observable<ICountrySubCollection[]>{
    const urlContrys:string = "https://restcountries.eu/rest/v2/all";
    let countrys =  this.http.get<ICountrySubCollection[]>(urlContrys).pipe(
      map(response =>{
        let countrys:ICountrySubCollection[] = [];

        countrys.push({
          numericCode:'',
          name:'Seleccione...'
        })

        response.forEach((item)=>{
          let country:ICountrySubCollection = {
            numericCode:item.numericCode,
            name:item.name
          };

          countrys.push(country);
        })
        return countrys;
      })
    );

    return countrys;
  }

  async getEvents():Promise<IEventsCollection[]>{
    return await (await this.firestore.collection<IEventsCollection>(CollectionEnum.events).get().toPromise()).docs.map((res)=>{
      let data = res.data();
      let event:IEventsCollection = {
        id:data.id,
        title: data.title,
        urlImage: data.urlImage
      }
      return event;
    });
  }

  async getBadges():Promise<IBadgesCollection[]>{
    return await (await this.firestore.collection<IBadgesCollection>(CollectionEnum.badges).get().toPromise()).docs.map((res)=>{
      let data = res.data();
      let badge:IBadgesCollection = {
        id:data.id,
        title: data.title,
        urlImage: data.urlImage
      }
      return badge;
    });
  }
}
