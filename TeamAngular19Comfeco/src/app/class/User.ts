import { ICountrySubCollection } from "./ICountrySubCollection";
import { IGenderSubCollection } from "./IGenderSubCollection";
import { IKnowledgeAreaSubCollection } from "./IKnowledgeAreaSubCollection";
import { IUsersCollection } from "./IUsersCollection";

export class User{
    uid:string;
    email:string;
    password:string;
    emailVerified:boolean;
    displayName:string;
    gender:IGenderSubCollection;
    dateOfBirth:string;
    country:ICountrySubCollection;
    urlAvatar:string;
    biography:string;
    facebook:string;
    github:string;
    linkedin:string;
    twitter:string;
    knowledgeArea:IKnowledgeAreaSubCollection[];

    constructor(){
        this.email = '';
        this.password = '';
        this.emailVerified = false;
        this.uid = '';
        this.displayName = '';
        this.gender = null;
        this.dateOfBirth = '1900-01-01';
        this.country = null;
        this.urlAvatar = '';
        this.biography = '';
        this.facebook = '';
        this.github = '';
        this.linkedin = '';
        this.twitter = '';
        this.knowledgeArea = [];
    }
}