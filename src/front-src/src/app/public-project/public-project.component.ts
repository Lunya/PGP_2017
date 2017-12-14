import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../objects/Project';
import { Sprint } from '../objects/Sprint';
import { User } from '../objects/User';
import { ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserStory } from '../objects/UserStory';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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


	constructor(
		private fb: FormBuilder,
		private http: HttpClient,
		private route: ActivatedRoute
	) {
		let paramID;
		this.route.params.subscribe(params => {
			paramID = params['idProject'];
			this.http.get<Project>('http://localhost:3000/api/' + paramID).subscribe((result) => {
				this.project = result;
				this.loadUserStories();
				this.loadSprints();
				this.loadUsers();
			}, error => console.log(error));
		});
	}


	loadUserStories(): void {
		this.http.get<UserStory[]>('http://localhost:3000/api/userstories' + '/' + this.project.id).subscribe((result) => {
			this.usList = result;
		}, error => console.log(error));
	}


	loadSprints(): void {
		this.http.get<Sprint[]>('http://localhost:3000/api/sprints' + '/' + this.project.id).subscribe((result) => {
			this.sprints = result;
		}, error => console.log(error));
	}



	loadUsers(): void {
		this.http.get<User[]>('http://localhost:3000/api/users' + '/' + this.project.id).subscribe((result) => {
			this.users = result;
		}, error => console.log(error));
	}

}
