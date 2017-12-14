import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Project } from '../objects/Project';
import { NgbDatepickerConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewProjectComponent } from './new-project/new-project.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { current } from 'codelyzer/util/syntaxKind';
import { AuthService } from '../services/auth.service';
import { RequestOptions } from '@angular/http';

const projectsUrl = 'http://localhost:3000/api/projects';

@Component({
	selector: 'app-workspace',
	templateUrl: './workspace.component.html',
	styleUrls: ['./workspace.component.css'],
	providers: [NgbDatepickerConfig]
})
export class WorkspaceComponent implements OnInit {
	private myProjects = [];
	private otherProjects = [];
	private projectsTableView = true;

	constructor(
		private modalService: NgbModal,
		private http: HttpClient,
		private auth: AuthService
	) {}

	private loadProjects(): void {
		let headers = new HttpHeaders();
		headers = this.auth.addAuthHeader(headers);
		console.log(headers);
		this.http.get<Project[]>(projectsUrl + '/' + localStorage.getItem('user.id'), {headers: headers}).subscribe((result) => {
			this.myProjects = []; this.otherProjects = [];
			for (let i = 0; i < result.length; i++) {
				result[i].begin = new Date(result[i].begin);
				result[i].end = new Date(result[i].end);
				result[i].status === 'OWNER' ? this.myProjects.push(result[i]) : this.otherProjects.push(result[i]);
			}
		}, error => console.log(error));
	}


	ngOnInit() {
		this.loadProjects();
	}

	newProject() {
		const modalRef = this.modalService.open(NewProjectComponent);
		modalRef.result
			.then(res => {
				this.loadProjects();
			}).catch(reason => console.log(reason));
	}

	projectsView(value) {
		this.projectsTableView = value;
	}
}
