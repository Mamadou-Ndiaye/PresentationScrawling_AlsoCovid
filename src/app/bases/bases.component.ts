import { Component, OnInit } from '@angular/core';
import {WebDocument} from "../classes/WebDocument";
import {DocumentsService} from "../services/documents.service";
import {AuthentificationService} from "../services/authentification.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-bases',
  templateUrl: './bases.component.html',
  styleUrls: ['./bases.component.css']
})
export class BasesComponent implements OnInit {

  environnement: any;
  covid: any;
  objet: any;
  nutrition: any;
  identite: any;
  sanitaire: any;
  documents: any;

  dataSearchWho : any = null ;
  dataSearchArticle: any;
  articles: any;
  pubmeds: any;
  natures: any;
  elseviers : any;
  plosones : any;

  public article: boolean = false;

  public timestamp: number=0;



  // Pour afficher le div de suivi covid,changer affichage en fonction ce la valeur de mode
  // Si mode = false on affiche la partie de sans suivi covid et si c est true on affiche la partie suivi covid en restant dans le meme page
  mode: boolean = false;
  senegal: boolean = false;
  burkina: boolean = false;
  mali: boolean = false;


//Gestion de la pagination de documents
  public size: number = 20;
  public currentPage: number = 0;
  public totalPages: number = 0;
  public pages?: Array<number>;

  private images: string[] = [];
  //recuperer url courante
  public currentUrl: any;

  background: boolean = false;

  private url: string[] = [];

  //Declaration d un element de WebDocument
  docs: WebDocument[] = [];
  private random: any;
  private img?: any;
  public numberAleatoire: number = 0;
  //Affiche du iframe pdf
  affPDF: boolean = false;
  public currentPdf: number = 0;
  ipdf: number = 0;
  // Pagination article
  pageCourant: number = 0
  public taille: number = 100;
  pagesTotal: number = 0;
  pagesArticles?: Array<number>;
  // Pour la recherche
  currentKeyword?: any;
  modeByKeyWord: boolean = false;
  pageableByCherche: boolean = false;

  // Recherche multiple
  theCheckbox: boolean=false;
  selected: string[] = [];
  unselected: string[] = [];
  intersect: string[] = [];
  deselectedValue?: string;
  marked = false;
  // i?: number;
  filtres: any;
  modeFiltre = false;
  i=0;

  body?: any;
  private result?: string;
  private $scope: any;



  constructor(public documentsService: DocumentsService, private  authentificationService: AuthentificationService, private sanitizer: DomSanitizer) {
    this.url = ["/webDocumentOrderByCovid", "/webDocumentOrderByhistorique", "/webDocumentOrderByIdentite",
      "/webDocumentOrderByEnvironnement", "/webDocumentOrderByNutrition", "/webDocumentOrderByObjet"];

  }


  ngOnInit(): void {


  }

  onChercher(form: any) {
    this.pageableByCherche = true;
    this.documentsService.isOpen = true;
    //console.log(form);
    this.currentPage = 0;
    this.currentKeyword = form.keyword;
    this.modeByKeyWord = true;
    this.modeFiltre=false;


    this.chercherDocument();



    //console.log(this.dataSearchWho)




  }

  chercherDocument() {
    //this.modeByKeyWord = true;
    this.documentsService.getWhobyKeyword(this.currentKeyword, this.currentPage, this.size)
      .subscribe(data => {
       // console.log("*********"+ JSON.parse(JSON.stringify(data)));
        //this.dataSearchWho= JSON.parse(JSON.stringify(data));
       // console.log("************************"+this.dataSearchWho["_embedded"]["whoes"].length);
        this.dataSearchWho=data;
        if(this.dataSearchWho["_embedded"]["whoes"].length ===0)
        {
          this.dataSearchWho=null;
          this.chercherArticle();
        }
       // this.pagesTotal = this.documents.totalPages;
       // this.pages = new Array<number>(this.pagesTotal);

      }, err => {
        console.log(err);
      });



  }

  getTS() {
    return this.timestamp;
  }


  //**************************** recherche dans article**************//

  chercherArticle() {

    this.documentsService.getArticlebyKeyword(this.currentKeyword,this.currentPage,this.size)
      .subscribe(data => {
       // this.articles = data;
        this.dataSearchArticle= data;
        if(this.dataSearchArticle["_embedded"]["articles"].length===0)
        {
          this.dataSearchArticle=null;
          console.log("*******appeler une autre fonction chercherPubmed() ********");
          this.chercherPubmed();
        }

      }, err => {console.log(err); });

  }

  // =================== Chercher dans PubMebs *****================
   chercherPubmed(){

    this.documentsService.getPubmedbyKeyword(this.currentKeyword,this.currentPage,this.size)
      .subscribe(data => {
        this.pubmeds = data;
        console.log("la taille pubmeds"+this.pubmeds["_embedded"]["pubMeds"].length);
        if(this.pubmeds["_embedded"]["pubMeds"].length === 0)
        {
          this.pubmeds = null;
          console.log("*******appeler la fonction chercherNature() ********");
          this.chercherNature();
        }

      }, err => {console.log(err); });
  }
  // ==================********* FIN chercherPubmed() ********============//


  // =================== Chercher dans Natures *****================

  chercherNature() {

    this.documentsService.getNaturebyKeyword(this.currentKeyword,this.currentPage,this.size)
      .subscribe(data => {
        this.natures = data;
        if(this.natures["_embedded"]["natures"].length === 0)
        {
             this.natures=null;
             this.chercherElsevier();
            console.log("*******appeler une autre fonction elseviers *******");
        }

      }, err => {console.log(err); });

  }

// ==================********* FIN chercherNature() ********============//


  // =================== Chercher dans Elsevier *****================ //

  chercherElsevier() {

    this.documentsService.getElsevierbyKeyword(this.currentKeyword,this.currentPage,this.size)
      .subscribe(data => {
        this.elseviers = data;
        console.log("elseviers "+this.elseviers);
        if(this.elseviers["_embedded"]["elseviers"].length === 0)
        {
          this.chercherPlosone();
          console.log("*******appeler une autre fonction plosOne *******");
        }
        // this.totalPages=data["page"].totalPages;
        // this.pages=new  Array<number>(this.totalPages);

      }, err => {console.log(err); });

  }


// ==================********* FIN chercherElsevier() ********============//


  // =================== Chercher dans plosOnes *****================ //


  chercherPlosone() {
    this.documentsService.getPlosOnebyKeyword(this.currentKeyword,this.currentPage,this.size)
      .subscribe(data => {
        this.plosones = data;
        console.log("documents "+this.plosones);
        // this.totalPages=data["page"].totalPages;
        // this.pages=new  Array<number>(this.totalPages);

      }, err => {console.log(err); });

  }

// ==================********* FIN chercherPlosone() ********============//


}
