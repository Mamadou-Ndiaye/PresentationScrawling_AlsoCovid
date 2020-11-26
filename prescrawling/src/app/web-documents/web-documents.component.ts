import { Component, OnInit } from '@angular/core';
import {DocumentsService} from "../services/documents.service";
import {CategoriesComponent} from "../categories/categories.component";
import {Utilisateur} from "../classes/Utilisateur";
import {WebDocument} from "../classes/WebDocument";


@Component({
  selector: 'app-web-documents',
  templateUrl: './web-documents.component.html',
  styleUrls: ['./web-documents.component.css']
})
export class WebDocumentsComponent implements OnInit {
   environnement: any;
   covid: any;
   objet: any;
   nutrition: any;
   identite: any;
   sanitaire: any;
   documents: any;

  private url: string[]=["/webDocumentOrderByCovid","/webDocumentOrderByhistorique","/webDocumentOrderByIdentite",
    "/webDocumentOrderByEnvironnement","/webDocumentOrderByNutrition", "/webDocumentOrderByObjet"];


   //Declaration d un element de WebDocument
  docs:WebDocument[]=[];
  private random: any;
  private img?: string[]=undefined;



  constructor(private documentsService : DocumentsService) { }


  ngOnInit(): void {


  //  J envoie la requete au service qui va aller recuperer les donneesde la base et on le met dans  documents e

    this.covid=this.documentsService.covid;
   this.environnement=this.documentsService.environnement;
    this.objet=this.documentsService.objet;
    this.nutrition=this.documentsService.nutrition;
    this.identite=this.documentsService.identite;
    this.sanitaire=this.documentsService.sanitaire;
    this.documentsService.getAlldocuments(this.url[0])
      .subscribe(data=>{
        console.log(data)
        this.documents= data;
        console.log("liste des documents",this.documents)
      }, error => {console.log(error)});

   // this.getNumberAleatoire();
  }
   getNumberAleatoire(): number {
    // var min=1;
    // var max=10;
   this.docs.forEach(doc=>{
     this.img=doc.img;
   })
    //  console.log("voici un notre aleatoire", Math.floor(Math.random() * (this.img.length - 0)) + 0)
    // return   Math.floor(Math.random() * (this.img.lenght - 0)) + 0;
     return 0;
  }

  public changeShow(x:string){
    this.documentsService.getAlldocuments(x).subscribe(
      data=>{
        console.log(data)
        this.documents= data;
        console.log("liste des documents",this.documents)
      }, error => {console.log(error)}
    )
  }


}
