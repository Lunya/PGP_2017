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


	constructor(
		private modalService: NgbModal
	) {}

	ngOnInit() {
	}

	newProject() {
		const modalRef = this.modalService.open(NewProjectComponent);
	}
}
