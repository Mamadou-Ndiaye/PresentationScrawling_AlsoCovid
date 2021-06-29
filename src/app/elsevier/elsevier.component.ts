import { Component, OnInit } from '@angular/core';
import {DocumentsService} from "../services/documents.service";

@Component({
  selector: 'app-elsevier',
  templateUrl: './elsevier.component.html',
  styleUrls: ['./elsevier.component.css']
})
export class ElsevierComponent implements OnInit {

  public  taille:number=100;

  elsevier: any;
  elseviers: any;
  pagesElseviers?:Array<number>;
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


  intersect: string[] = [];
  deselectedValue?: string;
  marked = false;
  filtres: any;
  modeFiltre = false;
  i=0;

  constructor(public  documentsService:DocumentsService) { }

  ngOnInit(): void {
    this.getElsevier();
  }

  //*********************  Pour articles (Elsevier) *******************************//
  getElsevier()
  {
    this.documentsService.isOpen= false;

    this.elsevier=true;
    this.documentsService.getAllElsevier(this.pageCourant,this.taille).subscribe(
      data=>{
        console.log(data);

        this.elseviers= data;
        this.pagesTotal=this.elseviers.page.totalPages;
        console.log(this.pagesTotal);
        this.pagesElseviers=new  Array<number>(this.pagesTotal);
      },error => { console.log(error)});
  }

  onPageElsevier(indice: number) {
    this.pageCourant=indice;
    this. getElsevier();

  }

  onChercherByElsevier(form: any) {
    console.log(form);
    this.currentPage=0;
    this.currentKeyword=form.keyword;
    this.modeByKeyWord=true;
    this.modeFiltre=false;
    console.log("Cherche par "+this.currentKeyword);
    this.chercherElsevier();
  }

  chercherElsevier() {

    this.documentsService.getElsevierbyKeyword(this.currentKeyword,this.currentPage,this.size)
      .subscribe(data => {
        this.elseviers = data;
        console.log("documents "+this.elseviers);
        // this.totalPages=data["page"].totalPages;
        // this.pages=new  Array<number>(this.totalPages);

      }, err => {console.log(err); });

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
      this.documentsService.getElsevierbyFilterTypeAndDate(this.selectedType,this.selected).subscribe(
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
      this.documentsService.getElsevierbyFilterAnnee(this.selected).subscribe(
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
      this.documentsService.getElsevierbyFilterType(this.selectedType).subscribe(
        data => {
          console.log(data);
          this.filtres = data;
        }, error => {
          console.log(error)
        });
    }

  }



}
