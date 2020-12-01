import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Utilisateur} from "../classes/Utilisateur";
import {DocumentsService} from "../services/documents.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
   public covid:boolean=false;
   public sanitaire: boolean=false;
   public identite: boolean=false;
   public environnement: boolean=false;
   public objet: boolean=false;
   public nutrition: boolean=false;

  constructor( private route: ActivatedRoute,
               private router: Router,private  documentsService:DocumentsService) { }

  ngOnInit(): void {
  }

  onCategories(dataForm: any) {
      this.documentsService.categoriesService(dataForm);
      console.log(this.covid,this.sanitaire,this.identite,this.environnement,this.objet,this.nutrition)
      this.router.navigateByUrl("/documents");

  }

}
