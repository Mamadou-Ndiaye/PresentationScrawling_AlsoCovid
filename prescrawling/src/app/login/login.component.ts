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
  users:Utilisateur[]=[]
  constructor( private route: ActivatedRoute,
               private router: Router,
               private authentificationService:AuthentificationService) { }

  ngOnInit(): void {
    this.authentificationService.getUtlisateur()

  }

  onLogin(dataForm: any) {
    console.log(dataForm)
    this.authentificationService.login(dataForm.username,dataForm.password);
    if(this.authentificationService.isLogin==true)
    {
      if (this.authentificationService.etat){
        this.router.navigateByUrl("/documents")
      }
      else{
       // this.authentificationService.userLogin.etat=true
        this.authentificationService.updateUtilisateur(this.authentificationService.userLogin).subscribe(
          data=> this.router.navigateByUrl('/categories')
        )

      }

    }
    else {
      console.log("login ou mdp incorrect")
      this.router.navigateByUrl('/login')
    }
  }







}
