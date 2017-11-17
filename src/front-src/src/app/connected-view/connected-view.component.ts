import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Project } from './project';

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
  list_project = [];
  model={nom: '', description: '', URLgit: '', datedebut: '', datefin: ''};



  constructor() { }

  ngOnInit() {
  }

  onAction_newproject(){
    let i = new Project(this.model.nom, this.model.description, this.model.URLgit, this.model.datedebut, this.model.datefin);
    this.list_project.push(i);
    };

  }
