import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Project } from '../objects/Project';
import { NgbDatepickerConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewProjectComponent } from './new-project/new-project.component';
import { HttpClient } from '@angular/common/http';
import { current } from 'codelyzer/util/syntaxKind';

const projectsUrl = 'http://localhost:3000/api/projects';

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
		private modalService: NgbModal,
		private http: HttpClient
	) {}

	private loadData(): void {
		this.http.get<Project[]>(projectsUrl + '/' + localStorage.getItem('user.id')).subscribe((result) => {
			for (let i = 0; i < result.length; i++) {
				result[i].begin = new Date(result[i].begin);
				result[i].end = new Date(result[i].end);
			}
			this.myProjects = result;
		}, error => console.log(error));
	}

	ngOnInit() {
		this.loadData();
	}

	newProject() {
		const modalRef = this.modalService.open(NewProjectComponent);
		modalRef.result
			.then(res => {
				this.loadData();
			}).catch(reason => console.log(reason));
	}

	projectsView(value) {
		this.projectsTableView = value;
	}
}
