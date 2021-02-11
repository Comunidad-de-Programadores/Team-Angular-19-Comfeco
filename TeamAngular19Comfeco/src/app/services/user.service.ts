import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../class/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private SESSION_USER = "SESSION_USER";
  public user:User = null;

  constructor(public auth: AngularFireAuth, private firestore:AngularFirestore) { 
    if(localStorage.getItem(this.SESSION_USER)){
      this.user = JSON.parse(localStorage.getItem(this.SESSION_USER));
    }else{
      this.user = null;
    }

    this.auth.authState.subscribe(userFire=>{
      if(userFire){
        this.user = this.createUser(userFire);
        localStorage.setItem(this.SESSION_USER, JSON.stringify(this.user))
      }else{
        if(localStorage.getItem(this.SESSION_USER)){
          this.user = JSON.parse(localStorage.getItem(this.SESSION_USER));
        }else{
          this.user = null;
        }
      }
    })
  }

  async signInUser(user:User):Promise<User>{
    let data = await this.auth.signInWithEmailAndPassword(user.email, user.password); 
    let userRes = this.createUser(data.user);
    this.user = userRes;
    localStorage.setItem(this.SESSION_USER, JSON.stringify(userRes))
    return userRes;
  }

  async signUpUser(user:User):Promise<User>{
    let data = await this.auth.createUserWithEmailAndPassword(user.email, user.password);
    await this.sendEmailVerification()
    let userRes = this.createUser(data.user);
    this.user = userRes;
    localStorage.setItem(this.SESSION_USER, JSON.stringify(userRes))
    return userRes;
  }

  private createUser(userFire:any):User{
    let user = new User();
    user.uid = userFire.uid;
    user.email = userFire.email;
    user.emailVerified = userFire.emailVerified;
    return user;
  }

  async sendPasswordResetEmail(email:string):Promise<void> {
    await this.auth.sendPasswordResetEmail(email);
  }

  async sendEmailVerification(){
    await (await this.auth.currentUser).sendEmailVerification(); 
  }

  async logoutUser():Promise<void>{
    await this.auth.signOut();
    this.user = null;
    localStorage.setItem(this.SESSION_USER, null)
  }

  isLoggedIn():boolean {
    return this.user?true:false; 
 }
}
