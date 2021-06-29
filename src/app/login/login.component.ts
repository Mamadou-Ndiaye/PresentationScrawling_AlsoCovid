import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";


import {AuthentificationService} from "../services/authentification.service";
import {Utilisateur} from "../classes/Utilisateur";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  users:Utilisateur[]=[];
  etat?:boolean=false;
  profile:string[]=[];
  user: Utilisateur = new Utilisateur();


  // User
  login?:String;

  // Affichage du formulaire d'inscription
  signUp:boolean=false;
  constructor( private route: ActivatedRoute,
               private router: Router,
               private authentificationService:AuthentificationService) { }

  ngOnInit(): void {
    this.authentificationService.getUtlisateur();
    console.log(this.signUp);
   // this.onSignUp();

  }

  onLogin(dataForm: any) {
    console.log(dataForm);
    this.signUp=false;
    console.log(this.signUp);
    this.authentificationService.login(dataForm.username,dataForm.password);
    if(this.authentificationService.isLogin==true)
    {
      if (this.authentificationService.etat){
        this.authentificationService.saveAuthentificatedUser();
        this.router.navigateByUrl("/whos")
      }
      else{
       // this.authentificationService.userLogin.etat=true
        this.authentificationService.saveAuthentificatedUser();
        this.authentificationService.updateUtilisateur(this.authentificationService.userLogin).subscribe(
          data=> this.router.navigateByUrl('/whos')  // / categories
        )

      }

    }
    else {
      console.log("login ou mdp incorrect")
      this.router.navigateByUrl('/login')
    }
  }

// Pour afficher (appeler) le formulaire inscription
  onSignUp() {
    this.signUp=true;
    console.log(this.signUp);
  }

  // Methode d'inscription
  save(dataForm: any) {
    console.log("inscription "  + dataForm);
    this.authentificationService.createUser(dataForm).subscribe(
      data => console.log(data),
        error => console.log(error)
    );
    this.signUp=false; // on ferme le formulaire d inscription
    this.gotoCategorie();
  }


  gotoCategorie() {
    //this.router.navigateByUrl('/categories'); // on ne passe plus dans categeries
    this.router.navigateByUrl('/whos');
  }

}
