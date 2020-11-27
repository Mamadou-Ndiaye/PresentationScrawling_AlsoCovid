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
   documents: any
//Gestion de la pagination
  public  size:number=20;
  public  currentPage:number=0;
  public  totalPages:number=0;
  public  pages?:Array<number>;
  public currentUrl:any;

  private url: string[]=[];

   //Declaration d un element de WebDocument
  docs:WebDocument[]=[];
  private random: any;
  private img?: string[]=undefined;



  constructor(private documentsService : DocumentsService) {
    this.url=["/webDocumentOrderByCovid","/webDocumentOrderByhistorique","/webDocumentOrderByIdentite",
      "/webDocumentOrderByEnvironnement","/webDocumentOrderByNutrition", "/webDocumentOrderByObjet"];

  }


  ngOnInit(): void {


  //  J envoie la requete au service qui va aller recuperer les donneesde la base et on le met dans  documents e
    this.onPageDocument(this.currentPage);
    this.covid=this.documentsService.covid;
   this.environnement=this.documentsService.environnement;
    this.objet=this.documentsService.objet;
    this.nutrition=this.documentsService.nutrition;
    this.identite=this.documentsService.identite;
    this.sanitaire=this.documentsService.sanitaire;
   this.changeShow(this.url[0])


  }


  onPageDocument(i: number) {
    this.currentPage=i;
    this.documentsService.getAlldocuments(this.currentUrl,this.currentPage,this.size)
      .subscribe(data=>{
        console.log("voila le resultat de get",data)
        console.log("page courrante est ",this.currentPage)
        // this.totalPages = data["page"].totalPages;
        // this.pages=new  Array<number>(this.totalPages);
        // this.totalPages = this.documents.totalPages;

        this.documents= data;

        this.totalPages = this.documents.totalPages;
        this.pages=new  Array<number>(this.totalPages);
        console.log("liste des documents",this.documents);
      }, error => {console.log(error)});

  }



// On appelle cette foncion dans le component HTML et l affichage change en fonction de url passer en parametre dans la
  // FONCTION changeShow(url)  en fonction du menu clique
  public changeShow(x:string){
    this.currentUrl=x;
    this.onPageDocument(this.currentPage)
    this.documentsService.getAlldocuments(x,this.currentPage,this.size).subscribe(
      data=>{
        console.log(data)
        this.documents= data;
        console.log("page courante = ",this.currentPage)
        this.totalPages = this.documents.totalPages;
        this.pages=new  Array<number>(this.totalPages);
        console.log("liste des documents",this.documents)
      }, error => {console.log(error)}
    )
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
}
