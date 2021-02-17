import { Component } from '@angular/core';
import { User } from './class/User';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TeamAngular19Comfeco';

  constructor(private userService:UserService){
    //funcion de ejemplo
    this.init()
  }

  //Ejemplo de llamado de funciones
  async init(){

    //this.create();
    //await this.login();
    //this.userService.logoutUser();
    //this.userService.sendPasswordResetEmail("ervinsv92@gmail.com");
    //this.userService.existsNick("");
    //console.log(this.userService.user);
  }

  //Funciones de ejemplo
  async login(){
    let user = new User();
    user.email = 'ervinsv92@gmail.com';
    user.password = '123456';
    try {
      await this.userService.signInUser(user);  
    } catch (error) {
      console.error(error.message)
    }
  }

  //Funciones de ejemplo
  async create(){
    let user = new User();
    user.email = 'ervinsv92@gmail.com';
    user.password = '123456';
    user.displayName = "Ervin";
    try {
      await this.userService.signUpUser(user); 
    } catch (error) {
      console.error(error.message)//Siempre leer usando el atributo mensaje, tanto para los throw creados manualmente como para los errores de firebase
    }
  }
}
