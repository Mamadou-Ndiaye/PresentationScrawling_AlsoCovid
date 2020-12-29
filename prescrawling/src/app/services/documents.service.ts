import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  public  host:string="http://localhost:8080";
  public covid: boolean=false;
  public sanitaire: boolean=false;
  public identite: boolean=false;
  public environnement: boolean=false;
  public objet: boolean=false;
  public nutrition: boolean=false;
  constructor(private  http : HttpClient) {
  }

  // getRessource(url)
  // {
  //   return this.http.get(url);
  // }

  getAlldocuments(url:string,page:number,size:number=20){
    return this.http.get(this.host+url+"?page="+page+"&size="+size);
  }

  public getDocumentbyKeyword(titre:string,page:number,size:number) {
    http://localhost:8080/webDocuments/search/byTitre?titre=mala&page=1&size=2
    return this.http.get(this.host +"/webDocuments/search/byTitre?titre="+titre+"&page="+page+"&size="+size);
  }

  getAllUsers(){
    return this.http.get(this.host+"/utilidsateurs");
  }

  getAllArticles(page:number,size:number){
    return this.http.get(this.host+"/articles?page="+page+"&size="+size);
  }

  public saveResssouce(url:any,data:any) {
    return this.http.put(url,data);

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
}
