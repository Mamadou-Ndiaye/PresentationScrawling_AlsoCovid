import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  public  host:string="http://localhost:8080";



  //public   host:string="http://172.16.1.117:8080/ALSOCOVID";

  // public  host:string="https://alsocovid.herokuapp.com";
 // host = environment.host;///


  public covid: boolean=false;
  public sanitaire: boolean=false;
  public identite: boolean=false;
  public environnement: boolean=false;
  public objet: boolean=false;
  public nutrition: boolean=false;
  constructor(private  http : HttpClient) {
  }

     //***........ servivces qui traitent les fonctionnalites de WebDocument  ...............***//

        // Recuperer les WebDocuments
        getAlldocuments(url:string,page:number,size:number=20){
          return this.http.get(this.host+url+"?page="+page+"&size="+size);
        }

        // Rechercher en fonction de  titre  pour les WebDocuments  par mot cle ,renvoie au formulaire de recherche
        public getDocumentbyKeyword(titre:string,page:number,size:number) {
         // http://localhost:8080/webDocuments/search/byTitre?titre=mala&page=1&size=2
          return this.http.get(this.host +"/webDocuments/search/byTitre?titre="+titre+"&page="+page+"&size="+size);
        }

        //**** Recherche multiple dans Web Documents
        public getDocumentbyFilter(titre:string[]) {
         //  http://localhost:8080/byFiltre?titre=malaria

            return this.http.get(this.host +"/byFiltre?titre="+titre);
        }

        categoriesService(dataForm: any) {
          this.covid=dataForm.covid;
          this.nutrition=dataForm.nutrition;
          this.sanitaire=dataForm.sanitaire;
          this.identite=dataForm.identite;
          this.objet=dataForm.objet
          this.environnement=dataForm.environnement;
          console.log(this.covid,this.sanitaire,this.identite,this.environnement,this.objet,this.nutrition)
        }

        getdocumentByCategories()
        {
          this.host+ "/webDocuments?projection=customWebDocument";

        }


  //***.......................Fin pour Web Document..............................***//

        getAllUsers(){
          return this.http.get(this.host+"/utilidsateurs");
        }



        public saveResssouce(url:any,data:any) {
          return this.http.put(url,data);

        }


  //***........ Parties du services qui traitent les fonctionnalites de articles Science direct  ...............***//

        // Rechercher en fonction de  titre  pour les articles  pazr mot cle ,renvoie au formulaire de recherche
        public getArticlebyKeyword(titre:string,page:number,size:number) {
          // http://localhost:8080/articles/search/byTitre?titre=mala&page=1&size=2
          return this.http.get(this.host +"/articles/search/byTitre?titre="+titre+"&page="+page+"&size="+size);
        }

        // Recuperer les articles de Science Direct( Article)
        getAllArticles(page:number,size:number){
          return this.http.get(this.host+"/articles?page="+page+"&size="+size);
        }

        //***........ Recherche multiple dans Article

        //... Recherche par Date et Type
        public getArticlesbyFilterTypeAndDate(type:string[],annee:string[]) {
          // http://localhost:8080/byFiltreArticle?type=art&annee=2020
          return this.http.get(this.host +"/byFiltreArticle?type="+type+"&annee="+annee);
        }
        //... Recherche par Date
        public getArticlesbyFilterAnnee(annee:string[]) {
          // http://localhost:8080/byFiltreAnnee?annee=2020,2019
          return this.http.get(this.host +"/byFiltreAnnee?annee="+annee);
        }
        //... Recherche par Type
        public getArticlesbyFilterType(type:string[]) {
          // http://localhost:8080/byFiltreType?type=articl
          return this.http.get(this.host +"/byFiltreType?type="+type);
        }

  //***.......................Fin pour Articles de Sciences Direct..............................***//




  //***........ Parties du services qui traitent les fonctionnalites de Nature  ...............***//

  // Rechercher en fonction de  titre  pour les articles  par mot cle ,renvoie au formulaire de recherche
  public getNaturebyKeyword(titre:string,page:number,size:number) {
    // http://localhost:8080/natures/search/byTitre?titre=mala&page=1&size=2
    return this.http.get(this.host +"/natures/search/byTitre?titre="+titre+"&page="+page+"&size="+size);
  }

  // Recuperer les articles de Science Direct( Article)
  getAllNatures(page:number,size:number){
    return this.http.get(this.host+"/natures?page="+page+"&size="+size);
  }

  //***........ Recherche multiple dans Nature

  //... Recherche par Date et Type
  public getNaturesbyFilterTypeAndDate(type:string[],annee:string[]) {
    // http://localhost:8080/byFiltreNature?type=art&annee=2020
    return this.http.get(this.host +"/byFiltreNature?type="+type+"&annee="+annee);
  }
  //... Recherche par Date
  public getNaturebyFilterAnnee(annee:string[]) {
    // http://localhost:8080/byFiltreNatureAnnee?annee=2020,2019
    return this.http.get(this.host +"/byFiltreNatureAnnee?annee="+annee);
  }
  //... Recherche par Type
  public getNaturesbyFilterType(type:string[]) {
    // http://localhost:8080/byFiltreNatureType?type=articl
    return this.http.get(this.host +"/byFiltreNatureType?type="+type);
  }

  //***.......................Fin pour Articles de Natures..............................***//


  //***........ Parties du services qui traitent les fonctionnalites PlosOne  ...............***//

  // Rechercher en fonction de  titre  pour les articles  par mot cle ,renvoie au formulaire de recherche
  public getPlosOnebyKeyword(titre:string,page:number,size:number) {
    // http://localhost:8080/natures/search/byTitre?titre=mala&page=1&size=2
    return this.http.get(this.host +"/plosOnes/search/byTitre?titre="+titre+"&page="+page+"&size="+size);
  }

  // Recuperer les articles de PlosOne( Article)
  getAllPlosOne(page:number,size:number){
    return this.http.get(this.host+"/plosOnes?page="+page+"&size="+size);
  }

  //***........ Recherche multiple dans PlosOne

  //... Recherche par Date et Type
  public getPlosOnesbyFilterTypeAndDate(type:string[],annee:string[]) {
    // http://localhost:8080/byFiltrePlosOne?type=art&annee=2020
    return this.http.get(this.host +"/byFiltrePlosOne?type="+type+"&annee="+annee);
  }
  //... Recherche par Date
  public getPlosOnebyFilterAnnee(annee:string[]) {
    // http://localhost:8080/byFiltrePlosOneAnnee?annee=2020,2019
    return this.http.get(this.host +"/byFiltrePlosOneAnnee?annee="+annee);
  }
  //... Recherche par Type
  public getPlosOnebyFilterType(type:string[]) {
    // http://localhost:8080/byFiltrePlosOneType?type=articl
    return this.http.get(this.host +"/byFiltrePlosOneType?type="+type);
  }

  //***.......................Fin pour Articles de PlosOne..............................***//


  //***........ Parties du services qui traitent les fonctionnalites Elsevier  ...............***//

  // Rechercher en fonction de  titre  pour les articles  par mot cle ,renvoie au formulaire de recherche
  public getElsevierbyKeyword(titre:string,page:number,size:number) {
    // http://localhost:8080/elseviers/search/byTitre?titre=mala&page=1&size=2
    return this.http.get(this.host +"/elseviers/search/byTitre?titre="+titre+"&page="+page+"&size="+size);
  }

  // Recuperer les articles de Science Direct( Article)
  getAllElsevier(page:number,size:number){
    return this.http.get(this.host+"/elseviers?page="+page+"&size="+size);
  }

  //***........ Recherche multiple dans Elsevier

  //... Recherche par Date et Type
  public getElsevierbyFilterTypeAndDate(type:string[],annee:string[]) {
    // http://localhost:8080/byFiltreElsevier?type=art&annee=2020
    return this.http.get(this.host +"/byFiltrePlosOne?type="+type+"&annee="+annee);
  }
  //... Recherche par Date
  public getElsevierbyFilterAnnee(annee:string[]) {
    // http://localhost:8080/byFiltreElsevierAnnee?annee=2021,2019
    return this.http.get(this.host +"/byFiltreElsevierAnnee?annee="+annee);
  }
  //... Recherche par Type
  public getElsevierbyFilterType(type:string[]) {
    // http://localhost:8080/byFiltreElsevierType?type=articl
    return this.http.get(this.host +"/byFiltreElsevierType?type="+type);
  }

  //***.......................Fin pour Articles de Elsevier..............................***//



  //***........ Parties du services qui traitent les fonctionnalites PubMed  ...............***//

  // Rechercher en fonction de  titre  pour les articles  par mot cle ,renvoie au formulaire de recherche
  public getPubmedbyKeyword(titre:string,page:number,size:number) {
    // http://localhost:8080/pubMeds/search/byTitre?titre=mala&page=1&size=2
    return this.http.get(this.host +"/pubMeds/search/byTitre?titre="+titre+"&page="+page+"&size="+size);
  }

  // Recuperer les articles de pub Med( Article)
  getAllPubmed(page:number,size:number){
    return this.http.get(this.host+"/pubMeds?page="+page+"&size="+size);
  }

  //***........ Recherche multiple dans Pubmed

  //... Recherche par Date et Type
  /*public getElsevierbyFilterTypeAndDate(type:string[],annee:string[]) {
    // http://localhost:8080/byFiltreElsevier?type=art&annee=2020
    return this.http.get(this.host +"/byFiltrePlosOne?type="+type+"&annee="+annee);
  }*/
  //... Recherche par Date
  public getPubmedbyFilterAnnee(annee:string[]) {
    // http://localhost:8080/byFiltrePubmedAnnee?annee=2021,2019
    // http://localhost:8080/byFiltrePubMedAnnee?annee=2020
    return this.http.get(this.host +"/byFiltrePubMedAnnee?annee="+annee);
  }
  //... Recherche par Type
  public getPubmedbyFilterType(type:string[]) {
    // http://localhost:8080/byFiltrePubmedType?type=articl
    return this.http.get(this.host +"/byFiltrePubmedType?type="+type);
  }

  //***.......................Fin pour Articles de Who..............................***//


  //***........ Parties du services qui traitent les fonctionnalites Who  ...............***//

  // Rechercher en fonction de  titre  pour les articles  par mot cle ,renvoie au formulaire de recherche
  public getWhobyKeyword(titre:string,page:number,size:number) {
    // http://localhost:8080/whoes/search/byTitre?titre=mala&page=1&size=2
    return this.http.get(this.host +"/whoes/search/byTitre?titre="+titre+"&page="+page+"&size="+size);
  }

  // Recuperer les articles de Who( Article)
  getAllWhos(page:number,size:number){
    return this.http.get(this.host+"/whoes?page="+page+"&size="+size);
  }

  //***........ Recherche multiple dans WHo

  //... Recherche par Date et Titre
  public getWhobyFilterTitreAndDate(titre:string[],annee:string[]) {
    // http://localhost:8080/byFiltreWho?titre=art&annee=2020
    return this.http.get(this.host +"/byFiltreWho?titre="+titre+"&annee="+annee);
  }
  //... Recherche par Date
  public getWhobyFilterAnnee(annee:string[]) {
    // http://localhost:8080/byFiltreWhoAnnee?annee=2021,2019
    return this.http.get(this.host +"/byFiltreWhoAnnee?annee="+annee);
  }
  //... Recherche par Titre
  public getWhobyFilterTitre(titre:string[]) {
    // http://localhost:8080/byFiltreWhoTitre?titre=articl
    return this.http.get(this.host +"/byFiltreWhoTitre?titre="+titre);
  }

  //***.......................Fin pour Articles de Who..............................***//


}
