import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebDocumentsComponent } from './web-documents/web-documents.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import {FormsModule} from "@angular/forms";
import {NgxImageGalleryModule} from "ngx-image-gallery";
import { NgxPaginationModule } from 'ngx-pagination';
import { ArticlesComponent } from './articles/articles.component';
import { NaturesComponent } from './natures/natures.component';
import { PlosonesComponent } from './plosones/plosones.component';
import { BasesComponent } from './bases/bases.component';

import { InfocovidComponent } from './infocovid/infocovid.component';
import { InfocovidSenegalComponent } from './infocovid-senegal/infocovid-senegal.component';
import { InfocovidBeninComponent } from './infocovid-benin/infocovid-benin.component';
import { ElsevierComponent } from './elsevier/elsevier.component';
import { PubmedComponent } from './pubmed/pubmed.component';
import { WhoComponent } from './who/who.component';
import { Wp1Component } from './wp1/wp1.component';
import { Wp2Component } from './wp2/wp2.component';
import { ProduitComponent } from './produit/produit.component';


@NgModule({
  declarations: [
    AppComponent,
    WebDocumentsComponent,
    LoginComponent,
    CategoriesComponent,
    ArticlesComponent,
    NaturesComponent,
    PlosonesComponent,
    BasesComponent,
    InfocovidComponent,
    InfocovidSenegalComponent,
    InfocovidBeninComponent,
    ElsevierComponent,
    PubmedComponent,
    WhoComponent,
    Wp1Component,
    Wp2Component,
    ProduitComponent


  ],
  imports: [
    BrowserModule,NgxPaginationModule,
    AppRoutingModule, HttpClientModule, FormsModule
  ],
  // on peut  definit ici les services de l app
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
