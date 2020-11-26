import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Utilisateur} from "../classes/Utilisateur";
import {forEachComment} from "tslint";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  public  host:string="http://localhost:8080";
  public isLogin:boolean=false;
  // Etat pour recuperer l etat de user current afin de injecter dans dans la classe login.ts
  // Pour faire le test afin de le redirige dans la partie souhaite
  public etat?:boolean;
  public userLogin=new Utilisateur();
  users:Utilisateur[]=[];
  userTrue: Utilisateur[]=[];

  constructor(private  http : HttpClient) { }

  //on envoie une requete a la partie backend demander les utilisateurs
  getUtilisateurs() {
    return this.http.get<Utilisateur[]>(this.host + "/users");

  }
 //////////////////
   getUtilisateursIsTrue(){
      return this.http.get<Utilisateur[]>(this.host+"/userTrue");
    }




//recuperer les donnees dans users pour enlever  les objets observales avec subscribe
  public getUtlisateur(){
    this.getUtilisateurs().subscribe(
      data=>{
        this.users=data;
        console.log("premier aff ",this.users);
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )


  }

  public  login(username:string,password:string)
  {
    this.users.filter(user=>{
      if (user.login===username && user.password===password && this.isLogin!=true)
      {
        this.etat=user.etat
        this.userLogin=user
        this.isLogin=true;

      }
      else if(this.isLogin!=true)
      {
        this.isLogin= false
      }
    })
  }

 public updateUtilisateur(user:Utilisateur){

    return this.http.put(this.host+"/updateUser/"+user.id,user)
 }




}
