import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICommunitysCollection } from '../class/ICommunitysCollection';
import { IContentCreatorsCollection } from '../class/IContentCreatorsCollection';
import { IEventCollection } from '../class/IEventCollection';
import { ISponsorsCollection } from '../class/ISponsorsCollection';
import { CollectionEnum } from '../enum/CollectionEnum';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore:AngularFirestore) { }

  async getCommunitys():Promise<ICommunitysCollection[]>{
    return await (await this.firestore.collection<ICommunitysCollection>(CollectionEnum.communitys).get().toPromise()).docs.map((res)=>{
      let data = res.data();
      let comunidad:ICommunitysCollection = {
        id:data.id,
        name:data.name,
        urlImage:data.urlImage
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
}
