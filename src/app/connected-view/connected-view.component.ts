import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import {CreateProject} from './create-project';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-connected-view',
  templateUrl: './connected-view.component.html',
  styleUrls: ['./connected-view.component.css']
})
export class ConnectedViewComponent implements OnInit {


  // nomprojet : string = "lol";
  // description : string;
  // URLDepot : string;
  // datedebut : string;
  // datefin : string;
  model=new CreateProject('non','bla','bla',5,5);



  constructor() { }

  ngOnInit() {
  }
  logForm(value){
    alert(value);
    };

  }
