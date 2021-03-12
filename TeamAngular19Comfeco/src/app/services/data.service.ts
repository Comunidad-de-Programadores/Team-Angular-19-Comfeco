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
import { IBadgeByUserCollection } from '../class/IBadgeByUserCollection';
import { IGroupCollection } from '../class/IGroupCollection';
import { User } from '../class/User';

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
        description:data.description,
        urlImage: data.urlImage
      }
      return event;
    });
  }

  async getEventsOfUser(uid:string):Promise<IEventsCollection[]>{
    return await (await this.firestore.collection<IEventsCollection>(CollectionEnum.events, ref=>ref.where('idUsers','array-contains',uid)).get().toPromise()).docs.map((res)=>{
      let data = res.data();
      let event:IEventsCollection = {
        id:data.id,
        title: data.title,
        description:data.description,
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
        urlImage: data.urlImage,
        description: data.description,
        typeBadge: data.typeBadge,
        howGet:data.howGet
      }
      return badge;
    });
  }

  async getBadgesByUser(uid:string):Promise<IBadgesCollection[]>{
    let badgesUser:IBadgesCollection[] = [];

    let badgesByUser = await (await this.firestore.collection<IBadgeByUserCollection>(CollectionEnum.badgesByUser, ref => ref.where('uid','==',uid)).get().toPromise()).docs.map((res)=>{
      let data = res.data();
      let badge:IBadgeByUserCollection = {
        uid:data.uid,
        badgesId:data.badgesId
      }
      return badge;
    });

    if(badgesByUser.length>0){
      badgesByUser[0].badgesId.forEach(async (badgeId)=>{
        let data = await this.firestore.collection<IBadgesCollection>(CollectionEnum.badges).doc(badgeId).get().pipe(
          map((res)=>{
            let data = res.data();
            let badge:IBadgesCollection = {
              id:data.id,
              title: data.title,
              urlImage: data.urlImage,
              description: data.description,
              typeBadge: data.typeBadge,
              howGet:data.howGet
            }
            return badge;
          })
        );
  
        badgesUser.push(await data.toPromise());
      })
    }

    return badgesUser;
  }

  async setBadgeToUserByType(uid:string, typeBadge:string){
    let badgesByUser = await (await this.firestore.collection<IBadgeByUserCollection>(CollectionEnum.badgesByUser, ref => ref.where('uid','==',uid)).get().toPromise()).docs.map((res)=>{
      let data = res.data();
      let badge:IBadgeByUserCollection = {
        uid:data.uid,
        badgesId:data.badgesId
      }
      return badge;
    });

    let badge = await (await this.firestore.collection<IBadgesCollection>(CollectionEnum.badges, ref => ref.where('typeBadge','==',typeBadge).limit(1)).get().toPromise()).docs.map((res)=>{
      let data = res.data();
        let badge:IBadgesCollection = {
          id:data.id,
          title: data.title,
          urlImage: data.urlImage,
          description: data.description,
          typeBadge: data.typeBadge,
          howGet:data.howGet
        }
        return badge;
    })[0];

    if(badgesByUser.length > 0){
      if(!badgesByUser[0].badgesId.find(x=> x == badge.id)){
        badgesByUser[0].badgesId.push(badge.id);
        this.firestore.collection<IBadgeByUserCollection>(CollectionEnum.badgesByUser).doc(uid).update(
        { 
          uid:uid,
          badgesId:badgesByUser[0].badgesId
        }
        );
      }
    }else{
      let badgeByUser:IBadgeByUserCollection = {
        uid:uid,
        badgesId:[badge.id]
      };
      
      this.firestore.collection<IBadgeByUserCollection>(CollectionEnum.badgesByUser).doc(uid).set(badgeByUser);
    }
  }

  getLanguajes():string[]{
    return ['Go', 'Java', 'JS', 'PHP', 'Python', '.Net'];
  }

  async getGroups(languaje:string):Promise<IGroupCollection[]>{

    let groups:IGroupCollection[] = [];

    if(languaje == ''){
      groups = await (await this.firestore.collection<IGroupCollection>(CollectionEnum.groups).get().toPromise()).docs.map((res)=>{
        let data = res.data();
        let group:IGroupCollection = {
          id:data.id,
          languaje:data.languaje,
          name:data.name,
          idUsers:data.idUsers,
          urlImage:data.urlImage,
          urlImageLanguaje:data.urlImageLanguaje
        }
        return group;
      });
    }else{
      groups = await (await this.firestore.collection<IGroupCollection>(CollectionEnum.groups, ref=>ref.where('languaje','==',languaje)).get().toPromise()).docs.map((res)=>{
        let data = res.data();
        let group:IGroupCollection = {
          id:data.id,
          languaje:data.languaje,
          name:data.name,
          idUsers:data.idUsers,
          urlImage:data.urlImage,
          urlImageLanguaje:data.urlImageLanguaje
        }
        return group;
      });
    }

    return groups;
  }

  async setUserToGroup(uid:string, idGroup:string){
    let group = await (await this.firestore.collection<IGroupCollection>(CollectionEnum.groups, ref => ref.where('id','==',idGroup).limit(1)).get().toPromise()).docs.map((res)=>{
      let data = res.data();
      let group:IGroupCollection = {
        id:data.id,
        languaje:data.languaje,
        name:data.name,
        idUsers:data.idUsers,
        urlImage:data.urlImage,
        urlImageLanguaje:data.urlImageLanguaje
      }
      return group;
    })[0];

    if(group.idUsers == undefined || group.idUsers.findIndex(x=>x == uid) < 0){
      if(group.idUsers == undefined){
        group.idUsers = [];
      }
      
      group.idUsers.push(uid);
      this.firestore.collection<IGroupCollection>(CollectionEnum.groups).doc(idGroup).update({
        idUsers:group.idUsers
      });
    }
  }

  async quitUserOfGroup(uid:string, idGroup:string){
    let group = await (await this.firestore.collection<IGroupCollection>(CollectionEnum.groups, ref => ref.where('id','==',idGroup).limit(1)).get().toPromise()).docs.map((res)=>{
      let data = res.data();
      let group:IGroupCollection = {
        id:data.id,
        languaje:data.languaje,
        name:data.name,
        idUsers:data.idUsers,
        urlImage:data.urlImage,
        urlImageLanguaje:data.urlImageLanguaje
      }
      return group;
    })[0];

    if(group.idUsers.findIndex(x=>x == uid) > -1){
      group.idUsers = group.idUsers.filter(x=>x != uid); 
      this.firestore.collection<IGroupCollection>(CollectionEnum.groups).doc(idGroup).update({
        idUsers:group.idUsers
      });
    }
  }

  async getGroupOfUser(uid:string):Promise<IGroupCollection>{
    let group = await (await this.firestore.collection<IGroupCollection>(CollectionEnum.groups, ref => ref.where('idUsers','array-contains',uid).limit(1)).get().toPromise()).docs.map((res)=>{
      let data = res.data();
      let group:IGroupCollection = {
        id:data.id,
        languaje:data.languaje,
        name:data.name,
        idUsers:data.idUsers,
        urlImage:data.urlImage,
        urlImageLanguaje:data.urlImageLanguaje
      }
      return group;
    })[0];

    return group;
  }

  async getUsersOfGroup(uids:string[]):Promise<User[]>{
    let users:User[] = [];

    uids.forEach((async (uid) =>{
      let user = await (await this.firestore.collection<User>(CollectionEnum.users, ref => ref.where('uid','==',uid).limit(1)).get().toPromise()).docs.map((res)=>{
        let data = res.data();
        let user:User = new User();
        user.uid = data.uid;
        user.displayName=data.displayName;
        return user;
      })[0];

      users.push(user)
    }))

    return users;
  }

  async setUserToEvent(uid:string, idEvent:string){
    let event = await (await this.firestore.collection<IEventsCollection>(CollectionEnum.events, ref => ref.where('id','==',idEvent).limit(1)).get().toPromise()).docs.map((res)=>{
      let data = res.data();
      let ev:IEventsCollection = {
        id:data.id,
        title:data.title,
        urlImage:data.urlImage,
        description:data.description,
        idUsers:data.idUsers
      }
      return ev;
    })[0];

    if(event.idUsers == undefined || event.idUsers.findIndex(x=>x == uid) < 0){
      if(event.idUsers == undefined){
        event.idUsers = [] 
      }
      
      event.idUsers.push(uid);

      this.firestore.collection<IEventsCollection>(CollectionEnum.events).doc(idEvent).update({
        idUsers:event.idUsers
      });
    }
  }
}
