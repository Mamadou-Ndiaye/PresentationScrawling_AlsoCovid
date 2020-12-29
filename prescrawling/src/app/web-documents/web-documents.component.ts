import {Component, OnInit, Pipe} from '@angular/core';
import {DocumentsService} from "../services/documents.service";
import {CategoriesComponent} from "../categories/categories.component";
import {Utilisateur} from "../classes/Utilisateur";
import {WebDocument} from "../classes/WebDocument";
import {AuthentificationService} from "../services/authentification.service";
import {DomSanitizer} from "@angular/platform-browser";


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

   articles: any;
  public article: boolean= false;


   // Pour gerer l action active sur le menu vertical
   //  status: boolean =false;

  // Pour afficher le div de suivi covid,changer affichage en fonction ce la valeur de mode
  // Si mode = false on affiche la partie de sans suivi covid et si c est true on affiche la partie suivi covid en restant dans le meme page
  mode:boolean=false;
   senegal:boolean=false;
   burkina: boolean=false;
  mali: boolean=false;


//Gestion de la pagination de documents
  public  size:number=20;
  public  currentPage:number=0;
  public  totalPages:number=0;
  public  pages?:Array<number>;

  private images: string[]=[];
  //recuperer url courante
  public currentUrl:any;

  background: boolean=false;

  private url: string[]=[];

   //Declaration d un element de WebDocument
  docs:WebDocument[]=[];
  private random: any;
  private img?: any;
  public numberAleatoire: number=0;
  //Affiche du iframe pdf
   affPDF: boolean=false;
  public  currentPdf:number=0;
  ipdf: number=0;
  // Pagination article
   pageCourant: number=0
  public  taille:number=100;
   pagesTotal:number=0;
   pagesArticles?:Array<number>;
   // Pour la recherche
   currentKeyword?: any;
   modeByKeyWord: boolean=false;






  constructor(private documentsService : DocumentsService,private  authentificationService:AuthentificationService,private sanitizer: DomSanitizer) {
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
    this.changeShow(this.url[0]);




  }

// Recuperer la page current  et on linjecte
  onPageDocument(i: number) {
    this.currentPage=i;
    this.modeByKeyWord=false;
    this.documentsService.getAlldocuments(this.currentUrl,this.currentPage,this.size)
      .subscribe(data=>{
        console.log("voila le resultat de get",data)
        console.log("page courrante est ",this.currentPage)
        // this.totalPages = data["page"].totalPages;


        this.documents= data;

        this.totalPages = this.documents.totalPages;
        this.pages=new  Array<number>(this.totalPages);
        console.log("liste des documents",this.documents);


        console.log("tableau image +++++",this.images);
      }, error => {console.log(error)});

  }


// On appelle cette foncion dans le component HTML et l affichage change en fonction de url passer en parametre dans la
  // FONCTION changeShow(url)  en fonction du menu clique
  public changeShow(x:string){

   // this.status = !this.status;

    this.mode=false;
    this.senegal=false;
    this.article=false;
    this.currentUrl=x;

    this.modeByKeyWord=false;

    this.background=true;
    this.onPageDocument(this.currentPage)
    this.documentsService.getAlldocuments(x,this.currentPage,this.size).subscribe(
      data=>{
        console.log(data)
        this.documents= data;

        // recuperons la taille du premier tabeau img qu on utilise dans la fonction gatNumberAleatoire pour generer un nombre aleat
        this.img=this.documents.content[0].img.length;
        this.numberAleatoire=Math.floor(Math.random() * (this.img - 0)) + 0
        console.log("-------------number Aleatoire-------------------",this.numberAleatoire);
        console.log("page courante = ",this.currentPage)
        this.totalPages = this.documents.totalPages;


        console.log("tableau image +++++",this.images);
        this.pages=new  Array<number>(this.totalPages);
        console.log("liste des documents",this.documents)
      }, error => {console.log(error)}
    )
  }


  // Pour le formulaire de recherche

  onChercher(form: any) {
    console.log(form);
    this.currentPage=0;
    this.currentKeyword=form.keyword;
    this.modeByKeyWord=true;
    console.log("Cherche par "+this.currentKeyword);
    this.chercherProduit();

  }

  chercherProduit() {

    this.documentsService.getDocumentbyKeyword(this.currentKeyword,this.currentPage,this.size)
      .subscribe(data => {
        this.documents = data;
        console.log("documents "+this.documents);
        // this.totalPages=data["page"].totalPages;
        // this.pages=new  Array<number>(this.totalPages);

      }, err => {console.log(err); });

  }




  getBackgroundColor(): string {
    return 'red';
  }



  getArticles()
   {
     this.senegal=false;
     this.mode=false;
     this.article=true;
     this.documentsService.getAllArticles(this.pageCourant,this.taille).subscribe(
       data=>{
         console.log(data);

         this.articles= data;
         this.pagesTotal=this.articles.page.totalPages;
         console.log(this.pagesTotal);
         this.pagesArticles=new  Array<number>(this.pagesTotal);
     },error => { console.log(error)});
   }





  // getNumberAleatoire(): number {
  //
  //    console.log("+++++++++++++++++++++++++voici un notre aleatoire+++++++++++++++++++++++++", Math.floor(Math.random() * (this.img - 0)) + 0)
  //    return  Math.floor(Math.random() * (this.img - 0)) + 0;
  //
  // }



  onLogout() {
    this.authentificationService.logout();
  }

  onShowCovd() {
    this.senegal=false;
    this.article=false;
    this.mode=true;
  }

  onShowCovdSenegal() {
    this.mode=false;
    this.article=false;
    this.senegal=true;
  }

  onShowCovdBurkina() {
    this.mode=false;
    this.burkina=true;
  }

  onShowCovdMali() {
    this.mode=false;
    this.mali=true;
  }

  // showPDF(i:number) {
  //   this.currentPdf=i;
  //   // this.ipdf=this.currentPdf
  //   // this.affPDF=true;
  // }
  showPDF(i=0) {
    this.currentPdf=i;
  }

  onPageArticle(indice: number) {
    this.pageCourant=indice;
    this. getArticles();

  }
}
