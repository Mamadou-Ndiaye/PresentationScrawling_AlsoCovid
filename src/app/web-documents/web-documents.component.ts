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
  public article: boolean = false;
  // Pour affichage


  // Pour gerer l action active sur le menu vertical
  //  status: boolean =false;

  // Pour afficher le div de suivi covid,changer affichage en fonction ce la valeur de mode
  // Si mode = false on affiche la partie de sans suivi covid et si c est true on affiche la partie suivi covid en restant dans le meme page
  mode: boolean = false;


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
  //
  public timestamp: number=0;



  constructor(public documentsService: DocumentsService, public  authentificationService: AuthentificationService, private sanitizer: DomSanitizer) {
    this.url = ["/webDocumentOrderByCovid", "/webDocumentOrderByhistorique", "/webDocumentOrderByIdentite",
      "/webDocumentOrderByEnvironnement", "/webDocumentOrderByNutrition", "/webDocumentOrderByObjet"];

  }


  ngOnInit(): void {


    //  J envoie la requete au service qui va aller recuperer les donneesde la base et on le met dans  documents e
    this.onPageDocument(this.currentPage);
    this.covid = this.documentsService.covid;
    this.environnement = this.documentsService.environnement;
    this.objet = this.documentsService.objet;
    this.nutrition = this.documentsService.nutrition;
    this.identite = this.documentsService.identite;
    this.sanitaire = this.documentsService.sanitaire;
    this.changeShow(this.url[3]);

  }

// Recuperer la page current  et on linjecte
  onPageDocument(i: number) {
    this.currentPage = i;
    this.documentsService.getAlldocuments(this.currentUrl, this.currentPage, this.size)
      .subscribe(data => {
        console.log("voila le resultat de get", data)
        console.log("page courrante est ", this.currentPage)
        this.documents = data;
        // recuperons la taille du premier tabeau img qu on utilise dans la fonction gatNumberAleatoire pour generer un nombre aleat
        this.img = this.documents.content[0].img.length;
        this.numberAleatoire = Math.floor(Math.random() * (this.img - 0)) + 0
        this.totalPages = this.documents.totalPages;
        this.pages = new Array<number>(this.totalPages);
        console.log("liste des documents", this.documents);

        console.log("tableau image +++++", this.images);
      }, error => {
        console.log(error)
      });
  }

  handlePageChange(event: number): void {
    this.currentPage = event;
    this.onPageDocument(this.i);
  }


// On appelle cette foncion dans le component HTML et l affichage change en fonction de url passer en parametre dans la
  // FONCTION changeShow(url)  en fonction du menu clique
  public changeShow(x: string) {

    // this.status = !this.status;

    this.mode = false;

    this.article = false;
    this.currentUrl = x;

    this.modeByKeyWord = false;

    this.background = true;
    this.onPageDocument(this.currentPage)
    this.documentsService.getAlldocuments(x, this.currentPage, this.size).subscribe(
      data => {
        console.log(data)
        this.documents = data;

        // recuperons la taille du premier tabeau img qu on utilise dans la fonction gatNumberAleatoire pour generer un nombre aleat
        this.img = this.documents.content[0].img.length;
        this.numberAleatoire = Math.floor(Math.random() * (this.img - 0)) + 0
        console.log("-------------number Aleatoire-------------------", this.numberAleatoire);
        console.log("page courante = ", this.currentPage)
        this.totalPages = this.documents.totalPages;


        console.log("tableau image +++++", this.images);
        this.pages = new Array<number>(this.totalPages);
        console.log("liste des documents", this.documents)
      }, error => {
        console.log(error)
      }
    )
  }


  // Pour le formulaire de recherche


  onChercher(form: any) {
    this.pageableByCherche = true;
    console.log(form);
    this.currentPage = 0;
    this.currentKeyword = form.keyword;
    this.modeByKeyWord = true;
    this.modeFiltre=false;
    console.log("Cherche par " + this.currentKeyword);
    this.chercherDocument();

  }

  chercherDocument() {

    this.documentsService.getDocumentbyKeyword(this.currentKeyword, this.currentPage, this.size)
      .subscribe(data => {
        this.documents = data;
        console.log("documents " + this.documents);

        // recuperons la taille du premier tabeau img qu on utilise dans la fonction gatNumberAleatoire pour generer un nombre aleat
        this.img = this.documents.content[0].img.length;
        this.numberAleatoire = Math.floor(Math.random() * (this.img - 0)) + 0

        // this.totalPages=data["page"].totalPages;
        this.totalPages = this.documents.totalPages;


        console.log("tableau image +++++", this.images);
        this.pages = new Array<number>(this.totalPages);
        console.log("liste des documents", this.documents)

      }, err => {
        console.log(err);
      });

  }



  //recherche multiple filtre


  toggleEditable(e :any) {
    this.modeByKeyWord=false;

    if (e.target.checked) {
      this.i++;
          if(this.i!=0)
          {
            this.modeFiltre = true;
          }
      console.log("I is  " + this.i);
      console.log("checked is " + e.target.checked);
      this.theCheckbox=true;
      this.selected.push(e.target.value);
      this.marked= e.target.checked;
      console.log("checkbox is "+ this.theCheckbox + " marked is  " + this.marked);
      console.log("valeur du checkbox ++++++°°°°°° " + e.target.value);
      console.log("Selected  ++++ " + this.selected);

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
      this.unselected.push(e.target.value);
      console.log("checkbox is "+ this.theCheckbox + " marked is  " + this.marked);
      console.log("Case decoché tableau " + this.unselected);
       let unchecked: string= e.target.value;
      //const index: number = monTableau.indexOf("uncheked");
      var index = this.selected.indexOf(unchecked);
      if (index > -1) { this.selected.splice(index, 1); }
      console.log("Bouton decoche et valeur is " ,e.target.value + " and index is " ,index);
      console.log("checkbox is "+ this.theCheckbox);
      console.log("restant du tableau tableau  " + this.selected);
    }

    if(this.selected.length!=0)
    {
      this.documentsService.getDocumentbyFilter(this.selected).subscribe(
        data => {
          console.log(data);
          this.filtres = data;
        }, error => {
          console.log(error)
        });

    }
    else
      this.onPageDocument(this.currentPage);



  }


  getTS() {
    return this.timestamp;
  }



}
