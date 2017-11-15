import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectViewComponent implements OnInit {
  nom_du_projet : string = "example_project";
  constructor() { }

  ngOnInit() {
  }

}
