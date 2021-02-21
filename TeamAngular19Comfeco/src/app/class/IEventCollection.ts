/**
 * Estructura de la coleccion event, esos campos son los requeridos para crear un objeto de la colección
 * La idea es que solo haya un objeto en la colección, el cual contendra el título que sale arriba del reloj,
 * ademas de la fecha descompuesta en la que inicia el evento o las fases del mismo.
 */

export interface IEventCollection{
    id:string;
    titlePhase:string;
    year:number;
    month:number;
    day:number;
    hour:number;
}