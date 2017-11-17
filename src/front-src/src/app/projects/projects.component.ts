import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Project } from '../project';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
	private user = 'user';
	private projects: Project[];

	constructor() {}
	ngOnInit() {
		this.projects = new Array<Project>();
		this.projects.push(new Project(1, 'aa'));
		this.projects.push(new Project(2, 'bb'));
	}
}
