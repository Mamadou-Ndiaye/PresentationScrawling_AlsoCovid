import { Component, OnInit } from '@angular/core';
import {DocumentsService} from "../services/documents.service";

@Component({
  selector: 'app-who',
  templateUrl: './who.component.html',
  styleUrls: ['./who.component.css']
})
export class WhoComponent implements OnInit {
  mode: boolean = false;
  //article: boolean;

  // Pour la recherche
  currentKeyword?: any;
  modeByKeyWord: boolean = false;
  pageableByCherche: boolean = false;
  images: string[] = [];


  documents: any;
  currentPage: number = 0;
  public size: number = 100;
  public  pagesTotal:number=0;
  public  pages?: Array<number>;
  pagesWhos?:Array<number>;

  numberAleatoire: any;
  public timestamp: number=0;

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

  constructor(public documentsService: DocumentsService) { }

  ngOnInit(): void {
    this.getWhos();
  }

  getWhos()
  {

   //this.mode=true;
    this.documentsService.getAllWhos(this.currentPage,this.size).subscribe(
      data=>{
        console.log(data);

        this.documents= data;
        this.pagesTotal=this.documents.page.totalPages;

       // this.pagesWhos=new  Array<number>(this.pagesTotal);
        this.pages=new  Array<number>(this.pagesTotal);
      },error => { console.log(error)});
  }


  onPageDocument(i: number) {
    this.currentPage=i;
    this. getWhos();
  }

  handlePageChange($event: number) {

  }

  onChercher(form: any) {
    this.pageableByCherche = true;
    //console.log(form);
    this.currentPage = 0;
    this.currentKeyword = form.keyword;
    this.modeByKeyWord = true;
    this.modeFiltre=false;
    console.log("Cherche par " + this.currentKeyword);
    this.chercherDocument();

  }

  chercherDocument() {
    //this.modeByKeyWord = true;
    this.documentsService.getWhobyKeyword(this.currentKeyword, this.currentPage, this.size)
      .subscribe(data => {
        this.documents = data;
        console.log("documents " + this.documents);

        // recuperons la taille du premier tabeau img qu on utilise dans la fonction gatNumberAleatoire pour generer un nombre aleat
        //this.img = this.documents.content[0].img.length;
       // this.numberAleatoire = Math.floor(Math.random() * (this.img - 0)) + 0

        // this.totalPages=data["page"].totalPages;
        this.pagesTotal = this.documents.totalPages;


       // console.log("tableau image +++++", this.images);
        this.pages = new Array<number>(this.pagesTotal);
       // console.log("liste des documents", this.documents)

      }, err => {
        console.log(err);
      });

  }

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
      this.documentsService.getWhobyFilterTitreAndDate(this.selectedType,this.selected).subscribe(
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
      this.documentsService.getWhobyFilterAnnee(this.selected).subscribe(
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
      this.documentsService.getWhobyFilterTitre(this.selectedType).subscribe(
        data => {
          console.log(data);
          this.filtres = data;
        }, error => {
          console.log(error)
        });
    }

  }

  getTS() {
    return this.timestamp;
  }

}
