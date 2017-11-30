import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Project } from '../objects/Project';

@Component({
	selector: 'app-workspace',
	templateUrl: './workspace.component.html',
	styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {
	private user = 'user';
	private myProjects: Project[];
	private otherProjects: Project[];

	public id: number;
	public name: string;
	public creator: string;
	public description: string;
	public url: string;
	public begin: Date;
	public end: Date;
	public participant: String[];

	private projectModel= {
 	 id: 0 ,
	 name: '',
	 creator: '',
 	 description: '',
 	 url: 0,
	 begin: '',
 	 end: '',
 	 participant: [],
  };

	private projectsTableView : boolean = true;
	constructor() {}
	ngOnInit() {
	}

	newProject() {

	}

projectsView(value) {
			this.projectsTableView = value;
		}
}
