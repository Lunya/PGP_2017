import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LigneTabUS } from './lignetabus';
import { LigneTabSprint } from './lignetabsprint'

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectViewComponent implements OnInit {
  nom_du_projet : string = "example_project";
  constructor() { }

  list_US = [];
  list_Sprint = [];
  model_US={id: 0, desc: '', dif: 0, prio: 0, done: ''};
  model_Sprint={idSp: 0, usSp: '', descSp: '', statutSp: ''};

  ngOnInit() {
  }

  onAction_newUS(){
    let i = new LigneTabUS(this.model_US.id, this.model_US.desc, this.model_US.dif, this.model_US.prio, this.model_US.done);
    this.list_US.push(i);
  }
  onAction_newSprint(){
    let i = new LigneTabSprint(this.model_Sprint.idSp, this.model_Sprint.usSp, this.model_Sprint.descSp, this.model_Sprint.statutSp);
    this.list_Sprint.push(i);
  }
}
