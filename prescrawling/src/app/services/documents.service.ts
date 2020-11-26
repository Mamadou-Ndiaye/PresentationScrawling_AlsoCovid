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

  getAlldocuments(url:string){
    return this.http.get(this.host+url);
  }
  getAllUsers(){
    return this.http.get(this.host+"/utilidsateurs");
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
