import { Component, OnInit, ElementRef, NgZone, Input } from '@angular/core';
import { Task } from '../../objects/Task';
import { Sprint } from '../../objects/Sprint';
import { UserStory } from '../../objects/UserStory';
import { User } from '../../objects/User';
import { Project } from '../../objects/Project';

import { HttpClient } from '@angular/common/http';

const urlTask = 'http://localhost:3000/api/task';
const urlTasks = 'http://localhost:3000/api/tasks';
const urlSprint = 'http://localhost:3000/api/sprint';

@Component({
	selector: 'app-sprint',
	templateUrl: './sprint.component.html',
	styleUrls: ['./sprint.component.css']
})

export class SprintComponent implements OnInit {

	private addTaskMode = false;
	private taskList = [];
	private sprintUSList = [];

	private currentTask = new Task();
	private previousTask = new Array<Task>();

	public sprint: Sprint;

	@Input('project')
	public project: Project;


	// private idTask = 1;

	private developers = new Array<User>();
	private taskTableView = false;

	constructor(
		private el: ElementRef,
		private http: HttpClient
	) {
	}

	ngOnInit() {
		this.loadTasks();
		this.loadUserStories();
	}

	loadTasks(): void {
		this.http.get<Task[]>(urlTasks + '/' + this.sprint.id).subscribe((result) => {
			this.taskList = result;
		}, error => console.log(error));
	}

	loadUserStories(): void {
		this.http.get<UserStory[]>(urlSprint + '/' + this.sprint.id).subscribe((result) => {
			this.sprintUSList = result;
		}, error => console.log(error));
	}

	public setSprint(sprintFrom): void {
		this.sprint = sprintFrom.sprint;
		this.developers = sprintFrom.developers;
	}


	resetModel() {
		this.currentTask.id = 0;
		this.currentTask.description = '';
		this.currentTask.developer = '';
		this.currentTask.state = 'TODO';
		this.currentTask.onEdit = false;
	}

	onEditRow(ligne) {
		ligne['onEdit'] = true;
		const tr_id = '#TASK' + ligne['id'];
		this.previousTask.push(Object.assign(new Task(), ligne));
		this.el.nativeElement.querySelector(tr_id).classList.add('table-info');
		const tab = this.el.nativeElement.querySelectorAll(tr_id + ' .editable');
		for (let i = 0; i < tab.length; ++i) {
			tab[i].setAttribute('contenteditable', 'true');
		}
	}

	onBackRow(ligne) {
		const tr_id = '#TASK' + ligne['id'];
		const save = this.previousTask.filter((task) => task.id === ligne.id)[0];
		ligne['description'] = save.description;
		ligne['developer'] = save.developer;
		ligne['state'] = save.state;
		ligne['onEdit'] = false;
		this.previousTask.splice(this.previousTask.indexOf(save), 1);
		this.el.nativeElement.querySelector(tr_id).classList.remove('table-info');
		const tab = this.el.nativeElement.querySelectorAll(tr_id + ' .editable');
		for (let i = 0; i < tab.length; ++i) {
			tab[i].setAttribute('contenteditable', 'false');
		}
	}

	onConfirmRow(ligne) {
		const tr_id = '#TASK' + ligne['id'];
		ligne['onEdit'] = false;
		const urlRequest = urlTask + '/' + this.sprint.id + '/' + ligne['id'];
		this.http.patch(urlRequest, ligne)
			.subscribe((result: any) => {
				if (result.error) {
					console.log(result);
				}
			}, err => {
				console.log(err);
			});
		const save = this.previousTask.filter((task) => task.id === ligne.id)[0];
		this.previousTask.splice(this.previousTask.indexOf(save), 1);
		this.el.nativeElement.querySelector(tr_id).classList.remove('table-info');
		const tab = this.el.nativeElement.querySelectorAll(tr_id + ' .editable');
		for (let i = 0; i < tab.length; ++i) {
			tab[i].setAttribute('contenteditable', 'false');
		}
	}

	onDeleteRow(ligne) {
		const urlRequest = urlTask + '/' + this.sprint.id + '/' + ligne['id'];
		this.http.delete(urlRequest)
			.subscribe((result: any) => {
				if (result.error) {
					console.log(result);
				} else {
					const i = this.taskList.indexOf(ligne);
					this.taskList.splice(i, 1);
				}
			}, err => {
				console.log(err);
			});
	}

	onEdit() {
		this.addTaskMode = true;
		this.taskTableView = true;
	}

	onBack() {
		this.addTaskMode = false;
	}

	onConfirm() {
		this.addTaskMode = false;
		const urlRequest = urlTasks + '/' + this.sprint.id;
		this.http.post(urlRequest, this.currentTask)
			.subscribe((result: any) => {
				if (result.error) {
					console.log(result);
				} else {
					this.loadTasks();
				}
			}, err => {
				console.log(err);
			});
		this.resetModel();
	}


	editSprint() {
	}

	deleteSprint() {
		const urlRequest = urlSprint + '/' + this.project.id + '/' + this.sprint.id;
		this.http.delete(urlRequest)
			.subscribe((result: any) => {
				if (result.error) {
					console.log(result);
				} else {
					window.location.reload();
				}
			}, err => {
				console.log(err);
			});
	}

	taskView(value) {
		this.taskTableView = value;
	}

}
