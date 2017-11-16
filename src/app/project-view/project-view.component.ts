import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LigneTab } from './lignetab';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectViewComponent implements OnInit {
  nom_du_projet : string = "example_project";
  constructor() { }


  model={id: '', desc: '', dif: '', prio: '', done: ''};

  ngOnInit() {
  }
  onAction_newUS(){
    //new_array = new lignetab(this.model.id, this.model.desc, this.model.prio, this.model.done);





  }
}
