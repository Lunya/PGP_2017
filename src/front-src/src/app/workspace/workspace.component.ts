import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Project } from '../objects/Project';
import { NgbDatepickerConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewProjectComponent } from './new-project/new-project.component';

@Component({
	selector: 'app-workspace',
	templateUrl: './workspace.component.html',
	styleUrls: ['./workspace.component.css'],
	providers: [NgbDatepickerConfig]
})
export class WorkspaceComponent implements OnInit {
	private user = 'user';
	private myProjects = [];
	private otherProjects = [];

	public id: number;
	public name: string;
	public creator: string;
	public description: string;
	public url: string;
	public begin: Date;
	public end: Date;
	public participant: String[];

	private projectModel = {
		id: 0,
		name: '',
		creator: '',
		description: '',
		url: 0,
		begin: '',
		end: '',
		participant: [],
	};

	private projectsTableView = true;

	constructor(
		private modalService: NgbModal
	) {}

	ngOnInit() {
		this.myProjects.push(new Project(
			1,'MyProject','jean-jean',
			'un pirate sachant piraté doit savoir piraté sans sa râte',
			'', '12/34/17', '12/35/17', []));	
	}

	newProject() {
		const modalRef = this.modalService.open(NewProjectComponent);
	}

	projectsView(value) {
		this.projectsTableView = value;
	}
}
