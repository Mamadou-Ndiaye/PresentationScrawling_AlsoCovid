import { Component, OnInit } from '@angular/core';
import {WebDocument} from "../classes/WebDocument";
import {DocumentsService} from "../services/documents.service";
import {Router} from "@angular/router";
import {AuthentificationService} from "../services/authentification.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-plosones',
  templateUrl: './plosones.component.html',
  styleUrls: ['./plosones.component.css']
})
export class PlosonesComponent implements OnInit {

  environnement: any;
  covid: any;
  objet: any;
  nutrition: any;
  identite: any;
  sanitaire: any;
  documents: any;

  plosones: any;
  public plosone: boolean= false;


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
  pagesNatures?:Array<number>;
  // Pour la recherche
  currentKeyword?: any;
  modeByKeyWord: boolean=false;

  // Recherche multiple
  theCheckbox: boolean=false;
  selected: string[] = []; // Stocke  les cases coches des Dates ( annees) d'articles
  selectedType: string[] = []; //  Stocke  les cases coches   des type articles


  intersect: string[] = [];
  deselectedValue?: string;
  marked = false;
  filtres: any;
  modeFiltre = false;
  i=0;







  constructor(private documentsService : DocumentsService,private  router:Router,private  authentificationService:AuthentificationService,private sanitizer: DomSanitizer) {
    this.url=["/webDocumentOrderByCovid","/webDocumentOrderByhistorique","/webDocumentOrderByIdentite",
      "/webDocumentOrderByEnvironnement","/webDocumentOrderByNutrition", "/webDocumentOrderByObjet"];

  }


  ngOnInit(): void {

    this.getPlosOnes();
    // Toutes les fonctions qui se trouvent dans cette classe ne sont pas forcément utilisé
    // en Generale c'est ceux qui utilise
  }


  //*********************  Pour articles (PlosOne) *******************************//
  getPlosOnes()
  {
    this.senegal=false;
    this.mode=false;
    this.plosone=true;
    this.documentsService.getAllPlosOne(this.pageCourant,this.taille).subscribe(
      data=>{
        console.log(data);

        this.plosones= data;
        this.pagesTotal=this.plosones.page.totalPages;
        console.log(this.pagesTotal);
        this.pagesNatures=new  Array<number>(this.pagesTotal);
      },error => { console.log(error)});
  }

  // recherche dans nature

  onChercherByPlosone(form: any) {
    console.log(form);
    this.currentPage=0;
    this.currentKeyword=form.keyword;
    this.modeByKeyWord=true;
    this.modeFiltre=false;
    console.log("Cherche par "+this.currentKeyword);
    this.chercherPlosone();

  }

  chercherPlosone() {

    this.documentsService.getPlosOnebyKeyword(this.currentKeyword,this.currentPage,this.size)
      .subscribe(data => {
        this.plosones = data;
        console.log("documents "+this.plosones);
        // this.totalPages=data["page"].totalPages;
        // this.pages=new  Array<number>(this.totalPages);

      }, err => {console.log(err); });

  }



  onPagePlosOne(indice: number) {
    this.pageCourant=indice;
    this. getPlosOnes();

  }

  //recherche multiple filtre en fonction de DAte et de Type

  toggleEditable(e :any) {

     this.modeFiltre=false;
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
      this.documentsService.getPlosOnesbyFilterTypeAndDate(this.selectedType,this.selected).subscribe(
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
      this.documentsService.getPlosOnebyFilterAnnee(this.selected).subscribe(
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
      this.documentsService.getPlosOnebyFilterType(this.selectedType).subscribe(
        data => {
          console.log(data);
          this.filtres = data;
        }, error => {
          console.log(error)
        });
    }

  }
  //*********************  Fin articles (PlosOne) *******************************//


}
