import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Utilisateur} from "../classes/Utilisateur";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  public  host:string="http://localhost:8080";
  public isLogin:boolean=false;
  // Etat pour recuperer l etat de user current afin de injecter dans la classe login.ts
  // Pour faire le test afin de le redirige dans la partie souhaite
  public etat?:boolean;
  public userLogin=new Utilisateur();
  users:Utilisateur[]=[];
  userTrue: Utilisateur[]=[];
  public token:any;

  constructor(private  http : HttpClient ,private route: ActivatedRoute,
              private router: Router) { }

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
        this.userLogin=user;
        this.token=btoa(JSON.stringify({username:user.login}) );
        this.isLogin=true;  // il est donc bien s authentifier

      }
      else if(this.isLogin!=true)
      {
        this.isLogin= false
      }
    })
  }

  //Pour que l'utilisateur ne log pas une fois connecter
  public  saveAuthentificatedUser(){
    if (this.isLogin)
    {
      //on en registre en local storage
      localStorage.setItem('authToken',this.token);
    }
  }

  // public  loadUserAuthentificatedFromLocalStorage()
  // {
  //   let t=localStorage.getItem('authToken');
  //   if (t)
  //   {
  //     let  user=JSON.parse(atob(t));
  //     this.userLogin={login:user.userLogin};
  //     console.log(this.userLogin)
  //     this.isLogin=true;
  //     this.token=t;
  //   }
  //
  // }

  public  removeTokenLocalStorage(){
    localStorage.removeItem('authToken');
    this.isLogin=false;
    this.token=undefined;
    this.userLogin=new Utilisateur();
  }

  public  logout(){

      this.router.navigateByUrl('/login');
  }



  // methode de mise a jour d un utilisareur
 public updateUtilisateur(user:Utilisateur){

    return this.http.put(this.host+"/updateUser/"+user.id,user)
 }

 public  createUser(user: Object): Observable<Object>
 {
   return this.http.post(this.host+"/utilisateurs", user);
 }




}
