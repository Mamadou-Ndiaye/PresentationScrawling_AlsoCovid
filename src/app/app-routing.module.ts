import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WebDocumentsComponent} from "./web-documents/web-documents.component";
import {LoginComponent} from "./login/login.component";
import {CategoriesComponent} from "./categories/categories.component";
import {AuthguardService} from "./services/authguard.service";
import {ArticlesComponent} from "./articles/articles.component";
import {NaturesComponent} from "./natures/natures.component";
import {PlosonesComponent} from "./plosones/plosones.component";
// ,canActivate : [AuthguardService]
const routes: Routes = [
  {path:'',component: WebDocumentsComponent},
  {path:"documents",component:WebDocumentsComponent},
  {path: "login",component: LoginComponent},
  {path: "categories",component: CategoriesComponent},
  {path: "articles",component: ArticlesComponent},
  {path: "natures",component: NaturesComponent},
  {path: "plosones",component: PlosonesComponent},
  {path: "bases",component: PlosonesComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
