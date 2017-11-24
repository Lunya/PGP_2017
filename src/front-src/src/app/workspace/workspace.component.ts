import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Project } from '../project';

@Component({
	selector: 'app-workspace',
	templateUrl: './workspace.component.html'
})
export class WorkspaceComponent implements OnInit {
	private user = 'user';
	private projects: Project[];

	constructor() {}
	ngOnInit() {
		this.projects = new Array<Project>();
		this.projects.push(new Project(1, 'aa'));
		this.projects.push(new Project(2, 'bb'));
	}
}
