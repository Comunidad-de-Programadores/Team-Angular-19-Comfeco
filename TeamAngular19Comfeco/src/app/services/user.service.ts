import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../class/User';
import { IUsersCollection } from '../class/IUsersCollection';
import { SessionEnum } from '../enum/SessionEnum';
import { CollectionEnum } from '../enum/CollectionEnum';
import { IGenderSubCollection } from '../class/IGenderSubCollection';
import { DataService } from './data.service';
import { TypeBadges } from '../enum/TypesEnum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user:User = null;

  constructor(public auth: AngularFireAuth, private firestore:AngularFirestore, private dataService:DataService) { 
    if(localStorage.getItem(SessionEnum.SESSION_USER)){
      this.user = JSON.parse(localStorage.getItem(SessionEnum.SESSION_USER));
    }else{
      this.user = null;
    }

    this.auth.authState.subscribe(async (userFire)=>{
      if(userFire){
        this.createObjectUser(userFire);
      }else{
        if(localStorage.getItem(SessionEnum.SESSION_USER)){
          this.user = JSON.parse(localStorage.getItem(SessionEnum.SESSION_USER));
        }else{
          this.user = null;
        }
      }
    })
  }

  async signInUser(user:User):Promise<User>{
    let data = await this.auth.signInWithEmailAndPassword(user.email, user.password); 
    return await this.createObjectUser(data.user);
  }

  async signUpUser(user:User):Promise<User>{
    if(user.displayName.trim() == "") throw new Error("El nick no pude estar vacio."); 
    if(await this.existsUserName(user.displayName)) throw new Error("El nombre de usuario ya existe.");
    
    let data = await this.auth.createUserWithEmailAndPassword(user.email, user.password);

    (await this.auth.currentUser).updateProfile({displayName:user.displayName});

    let userColl:IUsersCollection = {uid: data.user.uid,email:user.email, displayName:user.displayName};

    this.firestore.collection<IUsersCollection>(CollectionEnum.users).doc(userColl.uid).set(userColl);
    

    await this.sendEmailVerification();
    return await this.createObjectUser(data.user);
  }

  private async createObjectUser(userFire:any):Promise<User>{
    let userColl:IUsersCollection = await (await this.firestore.collection<IUsersCollection>(CollectionEnum.users).doc(userFire.uid).get().toPromise()).data();
    let user = new User();
    user.uid = userFire.uid;
    user.email = userFire.email;
    user.emailVerified = userFire.emailVerified;
    user.displayName = userColl.displayName;
    user.facebook = userColl.facebook;
    user.gender = userColl.gender;
    user.github = userColl.github;
    user.knowledgeArea = userColl.knowledgeArea;
    user.linkedin = userColl.linkedin;
    user.twitter = userColl.twitter;
    user.urlAvatar = this.getRandomAvatar();
    user.country = userColl.country;
    user.dateOfBirth = userColl.dateOfBirth;
    user.biography = userColl.biography;

    this.user = user;
    localStorage.setItem(SessionEnum.SESSION_USER, JSON.stringify(user));
    return user;
  }

  async sendPasswordResetEmail(email:string):Promise<void> {
    await this.auth.sendPasswordResetEmail(email);
  }

  private async sendEmailVerification():Promise<void>{
    await (await this.auth.currentUser).sendEmailVerification(); 
  }

  async logoutUser():Promise<void>{
    await this.auth.signOut();
    this.user = null;
    localStorage.setItem(SessionEnum.SESSION_USER, null)
  }

  isLoggedIn():boolean {
    return this.user?true:false; 
 }

 private async existsUserName(nombreUsuario:string, uid:string = ''):Promise<boolean>{
    let data = await (await this.firestore.collection<IUsersCollection>(CollectionEnum.users, ref => ref.where('displayName','==' , nombreUsuario).where('uid', '!=', uid).limit(1))).get().toPromise();

    if(data.docs.length > 0){
      return true;
    }else{
      return false;
    }
 }

 async updateUserProfile(user:User){
  let us = this.auth.currentUser;

  if(this.user.email.trim() != user.email.trim()){
    await (await us).updateEmail(user.email);  
    await this.sendEmailVerification();
  }

  if(user.password.trim() !== ""){
    await (await this.auth.currentUser).updatePassword(user.password);
  }

  if(this.user.displayName.trim() != user.displayName.trim()){
    await (await this.auth.currentUser).updateProfile({displayName:user.displayName});
  }

  let userColl:IUsersCollection = {
    uid:user.uid,
    displayName:user.displayName,
    email:user.email,
    biography:user.biography,
    country: {
      numericCode:user.country.numericCode,
      name:user.country.name
    },
    dateOfBirth:user.dateOfBirth,
    facebook:user.facebook,
    github:user.github,
    linkedin:user.linkedin,
    twitter:user.twitter,
    urlAvatar:user.urlAvatar,
    knowledgeArea:user.knowledgeArea,
    gender:{
      code:user.gender.code,
      description:user.gender.description
    },
  };

  await this.firestore.collection(CollectionEnum.users).doc(this.user.uid).update(userColl);
  await this.dataService.setBadgeToUserByType(this.user.uid, TypeBadges.sociable)
  await this.createObjectUser(userColl);
 }

 getGenders():IGenderSubCollection[]{
   return [{'code':'', 'description':'Seleccione...'}, {'code':'M', 'description':'Masculino'}, {'code':'F', 'description':'Femenino'}]
 }

 private getRandomAvatar(){
   let random = Math.floor(Math.random() * (51 - 1)) + 1;
   let urlRandomAvatar = `https://picsum.photos/id/${random}/500/500`;
   return urlRandomAvatar;
 }
}
