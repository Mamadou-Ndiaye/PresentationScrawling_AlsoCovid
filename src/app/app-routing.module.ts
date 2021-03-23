import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WebDocumentsComponent} from "./web-documents/web-documents.component";
import {LoginComponent} from "./login/login.component";
import {CategoriesComponent} from "./categories/categories.component";
import {AuthguardService} from "./services/authguard.service";
import {ArticlesComponent} from "./articles/articles.component";
import {NaturesComponent} from "./natures/natures.component";
import {PlosonesComponent} from "./plosones/plosones.component";
import {InfocovidComponent} from "./infocovid/infocovid.component";

import {InfocovidBeninComponent} from "./infocovid-benin/infocovid-benin.component";
import {InfocovidSenegalComponent} from "./infocovid-senegal/infocovid-senegal.component";
import {ElsevierComponent} from "./elsevier/elsevier.component";
import {PubmedComponent} from "./pubmed/pubmed.component";
import {WhoComponent} from "./who/who.component";
// ,canActivate : [AuthguardService]
const routes: Routes = [
  {path:"",component: WhoComponent},
  {path:"whos",component: WhoComponent},
 // {path:"",component: WebDocumentsComponent},
  // Pour enlever lapage de connexion il suffit d'enlever la page par defaut de Login comme composant de depart
  //{path: "",component: LoginComponent}, // route par de faut donc on fait appel a LoginComponent au demarrage de l application
  {path:"documents",component:WebDocumentsComponent},
  {path: "login",component: LoginComponent},
  {path: "categories",component: CategoriesComponent},
  {path: "articles",component: ArticlesComponent},
  {path: "natures",component: NaturesComponent},
  {path: "plosones",component: PlosonesComponent},
  {path: "elseviers",component: ElsevierComponent},
  {path: "pubmeds",component: PubmedComponent},
  {path: "bases",component: PlosonesComponent},
  {path: "infocovids",component: InfocovidComponent},
  {path: "infocovidBenin",component: InfocovidBeninComponent},
  {path: "infocovidSenegal",component: InfocovidSenegalComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
