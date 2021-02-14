import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../class/User';
import { IUsersCollection } from '../class/IUserCollection';
import { SessionEnum } from '../enum/SessionEnum';
import { CollectionEnum } from '../enum/CollectionEnum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user:User = null;

  constructor(public auth: AngularFireAuth, private firestore:AngularFirestore) { 
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
    

    await this.sendEmailVerification()
    return await this.createObjectUser(data.user);
  }

  private async createObjectUser(userFire:any):Promise<User>{
    let userColl:IUsersCollection = await (await this.firestore.collection<IUsersCollection>(CollectionEnum.users).doc(userFire.uid).get().toPromise()).data();
    let user = new User();
    user.uid = userFire.uid;
    user.email = userFire.email;
    user.emailVerified = userFire.emailVerified;
    user.displayName = userColl.displayName;

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
}
