export class User{
    uid:string;
    email:string;
    password:string;
    emailVerified:boolean;
    displayName:string;

    constructor(){
        this.email = '';
        this.password = '';
        this.emailVerified = false;
        this.uid = '';
        this.displayName = '';
    }
}