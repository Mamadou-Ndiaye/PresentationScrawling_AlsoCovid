import { Component, OnInit } from '@angular/core';
import {WebDocument} from "../classes/WebDocument";
import {DocumentsService} from "../services/documents.service";
import {AuthentificationService} from "../services/authentification.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {


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

  // Recherche multiple
  theCheckbox: boolean=false;
  selected: string[] = []; // Stocke  les cases coches des Dates ( annees) d'articles
  selectedType: string[] = []; //  Stocke  les cases coches   des type articles

 // unselected: string[] = [];
  intersect: string[] = [];
  deselectedValue?: string;
  marked = false;
  // i?: number;
  filtres: any;
  modeFiltre = false;
  i=0;







  constructor(private documentsService : DocumentsService,private  router:Router,private  authentificationService:AuthentificationService,private sanitizer: DomSanitizer) {
    this.url=["/webDocumentOrderByCovid","/webDocumentOrderByhistorique","/webDocumentOrderByIdentite",
      "/webDocumentOrderByEnvironnement","/webDocumentOrderByNutrition", "/webDocumentOrderByObjet"];

  }


  ngOnInit(): void {

      this.getArticles();
      // Toutes les fonctions qui se trouvent dans cette classe ne sont pas forcément utilisé
    // en Generale c'est ceux qui utilise
  }

// Recuperer la page current  et on l injecte
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
    this.router.navigateByUrl("/documents");

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
    this.chercherDocument();

  }



  chercherDocument() {

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


 //*********************  Pour articles (Science direct) *******************************//
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

  // recherche dans article

  onChercherByArticle(form: any) {
    console.log(form);
    this.currentPage=0;
    this.currentKeyword=form.keyword;
    this.modeByKeyWord=true;
    console.log("Cherche par "+this.currentKeyword);
    this.chercherArticle();

  }

  chercherArticle() {

    this.documentsService.getArticlebyKeyword(this.currentKeyword,this.currentPage,this.size)
      .subscribe(data => {
        this.articles = data;
        console.log("documents "+this.article);
        // this.totalPages=data["page"].totalPages;
        // this.pages=new  Array<number>(this.totalPages);

      }, err => {console.log(err); });

  }


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


  showPDF(i=0) {
    this.currentPdf=i;
  }

  onPageArticle(indice: number) {
    this.pageCourant=indice;
    this. getArticles();

  }

  //recherche multiple filtre en fonction de DAte et de Type

  toggleEditable(e :any) {


    // Recuperation des cases coches dans un tableau en selected pour les Dates (annees) et selectedType dans Type d article

    if (e.target.checked) {
      this.i++;
      if(this.i!=0)
      {
        this.modeFiltre = true;
      }
      console.log("I is  " + this.i);
      console.log("checked is " + e.target.checked);
      this.theCheckbox=true;
      console.log("type de la variable est "+ typeof (e.target.value) );
      console.log("comparaison"+ e.target.value.localeCompare("2020"));

      if(e.target.value.localeCompare("2021")==0 || e.target.value.localeCompare("2020")==0 || e.target.value.localeCompare("2019")==0 || e.target.value.localeCompare("2018")==0)
      {
        this.selected.push(e.target.value);
        this.marked= e.target.checked;
        console.log("checkbox is "+ this.theCheckbox + " marked is  " + this.marked);
        console.log("valeur du checkbox ++++++°°°°°° " + e.target.value);
        console.log("Selected  ++++ " + this.selected);

      }
      else
      {
        this.selectedType.push(e.target.value);
        this.marked= e.target.checked;
        console.log("checkbox is "+ this.theCheckbox + " marked is  " + this.marked);
        console.log("valeur du checkbox ++++++°°°°°° " + e.target.value);
        console.log("SelectedType is   ++++ " + this.selectedType);

      }


    }
    else  {
      this.i--;
      console.log("I is  " + this.i);
      if (this.i==0)
      {
        this.modeFiltre = false;
        console.log(" ++++++++++++mode filtre ------------------- " + this.modeFiltre);
      }
      this.theCheckbox=false;
      this.marked= e.target.checked;
      // this.unselected.push(e.target.value);
      // console.log("checkbox is "+ this.theCheckbox + " marked is  " + this.marked);
      // console.log("Case decoché tableau " + this.unselected);

      let unchecked: string= e.target.value;
      // Suppression de la valeur decoche dans le tableau selectionne
      if(e.target.value.localeCompare("2021")==0 ||e.target.value.localeCompare("2020")==0 || e.target.value.localeCompare("2019")==0 || e.target.value.localeCompare("2018")==0)
      {
        var index = this.selected.indexOf(unchecked);
        if (index > -1) { this.selected.splice(index, 1); }
        console.log("restant du tableau selected annee  is   " + this.selected);
      }
      else
      {
        var index = this.selectedType.indexOf(unchecked);
        if (index > -1) { this.selectedType.splice(index, 1); }
        console.log("Bouton decoche et valeur is " ,e.target.value + " and index is " ,index);
        console.log("restant du tableau selected Type is   " + this.selectedType);
      }

      console.log("checkbox is "+ this.theCheckbox);

    }
    console.log("taille de selected is " + this.selected.length);
    console.log("taille de selected type is" + this.selectedType.length);


    // Envoie du requete a la partie backend selon les elements coches
    //** Envoie dans la partie annee et type
    if(this.selected.length!=0 && this.selectedType.length!=0)
    {
      console.log("Envoie dans la partie annee et type");
      this.documentsService.getArticlesbyFilterTypeAndDate(this.selectedType,this.selected).subscribe(
        data => {
          console.log(data);
          this.filtres = data;
        }, error => {
          console.log(error)
        });
    }
    //** Envoie dans la partie annee
    else if(this.selected.length!=0 && this.selectedType.length==0)
    {
      console.log("Envoie dans la partie annee");
      this.documentsService.getArticlesbyFilterAnnee(this.selected).subscribe(
        data => {
          console.log(data);
          this.filtres = data;
        }, error => {
          console.log(error)
        });
    }
    //** Envoie dans la partie type
    else if(this.selected.length==0 && this.selectedType.length!=0)
    {
      console.log("Envoie dans la partie type");
      this.documentsService.getArticlesbyFilterType(this.selectedType).subscribe(
        data => {
          console.log(data);
          this.filtres = data;
        }, error => {
          console.log(error)
        });
    }

  }
  //*********************  Fin articles (Science direct) *******************************//


}
