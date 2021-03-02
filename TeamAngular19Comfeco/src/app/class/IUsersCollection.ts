/**
 * Estructura de la coleccion users, esos campos son los requeridos para crear un objeto de la colección
 */

import { ICountrySubCollection } from "./ICountrySubCollection";
import { IGenderSubCollection } from "./IGenderSubCollection";
import { IKnowledgeAreaSubCollection } from "./IKnowledgeAreaSubCollection";

export interface IUsersCollection{
    uid:string;
    email:string;
    displayName:string;
    gender?:IGenderSubCollection;
    dateOfBirth?:string;
    country?:ICountrySubCollection;
    urlAvatar?:string;
    biography?:string;
    facebook?:string;
    github?:string;
    linkedin?:string;
    twitter?:string;
    knowledgeArea?:IKnowledgeAreaSubCollection[];
}