import { Component } from '@angular/core';
import { Project } from '../objects/Project';
import { Sprint } from '../objects/Sprint';
import { User } from '../objects/User';
import { ElementRef } from '@angular/core';
import { UserStory } from '../objects/UserStory';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

const MAX_INT_PRIORITY = 1001;
const MIN_INT_PRIORITY = 0;

@Component({
	selector: 'app-public-project',
	templateUrl: './public-project.component.html',
	styleUrls: ['./public-project.component.css']
})

export class PublicProjectComponent {
	private sprints = [];
	private users = [];
	private usList = [];
	private project = new Project();
	private headers = new HttpHeaders();


	constructor(
		private fb: FormBuilder,
		private http: HttpClient,
		private route: ActivatedRoute,
		private auth: AuthService
	) {
		this.headers = this.auth.addAuthHeader(this.headers);
		let paramID;
		this.route.params.subscribe(params => {
			paramID = params['idProject'];
			this.http.get<Project>('http://localhost:3000/api/' + paramID, {headers: this.headers}).subscribe((result) => {
				this.project = result;
				this.loadUserStories();
				this.loadSprints();
				this.loadUsers();
			}, error => console.log(error));
		});
	}


	loadUserStories(): void {
		this.http.get<UserStory[]>('http://localhost:3000/api/userstories' + '/' + this.project.id, {headers: this.headers}).subscribe((result) => {
			this.usList = result;
		}, error => console.log(error));
	}


	loadSprints(): void {
		this.http.get<Sprint[]>('http://localhost:3000/api/sprints' + '/' + this.project.id, {headers: this.headers}).subscribe((result) => {
			this.sprints = result;
		}, error => console.log(error));
	}



	loadUsers(): void {
		this.http.get<User[]>('http://localhost:3000/api/users' + '/' + this.project.id, {headers: this.headers}).subscribe((result) => {
			this.users = result;
		}, error => console.log(error));
	}

}
