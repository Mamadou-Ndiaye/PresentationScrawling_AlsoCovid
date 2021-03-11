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
import {InfocovidBurkinaComponent} from "./infocovid-burkina/infocovid-burkina.component";
import {InfocovidGabonComponent} from "./infocovid-gabon/infocovid-gabon.component";
import {InfocovidSenegalComponent} from "./infocovid-senegal/infocovid-senegal.component";
import {InfocovidMaliComponent} from "./infocovid-mali/infocovid-mali.component";
// ,canActivate : [AuthguardService]
const routes: Routes = [
  {path:'',component: WebDocumentsComponent},
  {path:"documents",component:WebDocumentsComponent},
  {path: "login",component: LoginComponent},
  {path: "categories",component: CategoriesComponent},
  {path: "articles",component: ArticlesComponent},
  {path: "natures",component: NaturesComponent},
  {path: "plosones",component: PlosonesComponent},
  {path: "bases",component: PlosonesComponent},
  {path: "infocovids",component: InfocovidComponent},
  {path: "infocovidBenin",component: InfocovidBeninComponent},
  {path: "infocovidBurkina",component: InfocovidBurkinaComponent},
  {path: "infocovidMali",component: InfocovidMaliComponent},
  {path: "infocovidGabon",component: InfocovidGabonComponent},
  {path: "infocovidSenegal",component: InfocovidSenegalComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
