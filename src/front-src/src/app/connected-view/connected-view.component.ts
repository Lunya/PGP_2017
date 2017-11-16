import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-connected-view',
  templateUrl: './connected-view.component.html',
  styleUrls: ['./connected-view.component.css']
})
export class ConnectedViewComponent implements OnInit {


  // nom : string = "lol";
  // description : string;
  // URLDepot : string;
  // datedebut : string;
  // datefin : string;
  model={nom: '', description: '', URLgit: '', datedebut: '', datefin: ''};



  constructor() { }

  ngOnInit() {
  }

  onAction_newproject(){
    //INSERER ICI UNE REQUETE POST POUR LA CREATION D'UN PROJET
    };

  }
