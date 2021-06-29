import { Component, OnInit } from '@angular/core';
import {DocumentsService} from "../services/documents.service";

@Component({
  selector: 'app-pubmed',
  templateUrl: './pubmed.component.html',
  styleUrls: ['./pubmed.component.css']
})
export class PubmedComponent implements OnInit {


  public  taille:number=100;

  pubmed: boolean=false;
  pubmeds: any;
  pagesPubmeds?:Array<number>;
  pageCourant: number=0;
  pages: any;
  public  size:number=20;
  public  currentPage:number=0;
  pagesTotal:number=0;

  // Pour la recherche
  currentKeyword?: any;
  modeByKeyWord: boolean=false;


  // Recherche multiple
  theCheckbox: boolean=false;
  selected: string[] = []; // Stocke  les cases coches des Dates ( annees) d'articles
  selectedType: string[] = []; //  Stocke  les cases coches   des type articles
  unselected: string[] = [];

  intersect: string[] = [];
  deselectedValue?: string;
  marked = false;
  filtres: any;
  modeFiltre = false;
  i=0;


  constructor(public  documentsService:DocumentsService) { }

  ngOnInit(): void {
    this.getPubmed();
  }

  //*********************  Pour articles (Elsevier) *******************************//
  getPubmed()
  {
    this.documentsService.isOpen= false;

    this.pubmed=true;
    this.documentsService.getAllPubmed(this.pageCourant,this.taille).subscribe(
      data=>{
        console.log(data);

        this.pubmeds= data;
        this.pagesTotal=this.pubmeds.page.totalPages;
        console.log(this.pagesTotal);
        this.pagesPubmeds=new  Array<number>(this.pagesTotal);
      },error => { console.log(error)});
  }
  onPageElsevier(indice: number) {
    this.pageCourant=indice;
    this.getPubmed();

  }


  toggleEditable(e: any) {

    this.modeByKeyWord=false;

    if (e.target.checked) {
      this.i++;
      if(this.i!=0)
      {
        this.modeFiltre = true;
      }
     // console.log("I is  " + this.i);
     // console.log("checked is " + e.target.checked);
      this.theCheckbox=true;
      this.selected.push(e.target.value);
      this.marked= e.target.checked;
      //console.log("checkbox is "+ this.theCheckbox + " marked is  " + this.marked);
      //console.log("valeur du checkbox ++++++°°°°°° " + e.target.value);
      // console.log("Selected  ++++ " + this.selected);

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
      //console.log("checkbox is "+ this.theCheckbox + " marked is  " + this.marked);
     // console.log("Case decoché tableau " + this.unselected);
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
      this.documentsService.getPubmedbyFilterAnnee(this.selected).subscribe(
        data => {
          console.log(data);
          this.filtres = data;
        }, error => {
          console.log(error)
        });

    }
    else
      this.getPubmed();


  }

  onPagePubmed(indice: number) {
    this.pageCourant=indice;
    this. getPubmed();
  }

  onChercherByPubmed(form: any) {
    console.log(form);
    this.currentPage=0;
    this.currentKeyword=form.keyword;
    this.modeByKeyWord=true;
    this.modeFiltre=false;
    //console.log("Cherche par "+this.currentKeyword);
    this.chercherPubmed();
  }

  chercherPubmed() {

    this.documentsService.getPubmedbyKeyword(this.currentKeyword,this.currentPage,this.size)
      .subscribe(data => {
        this.pubmeds = data;
        console.log("documents "+this.pubmeds);
        // this.totalPages=data["page"].totalPages;
        // this.pages=new  Array<number>(this.totalPages);

      }, err => {console.log(err); });

  }


}
