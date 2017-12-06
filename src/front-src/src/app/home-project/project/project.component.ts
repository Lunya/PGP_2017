import { Component, OnInit, NgZone, Input } from '@angular/core';
import { UserStory } from '../../objects/UserStory';
import { ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Project } from '../../objects/Project';

const url_uStory = 'http://localhost:3000/api/userstory';
const url_uStories = 'http://localhost:3000/api/userstories';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.css'],
})


export class ProjectComponent implements OnInit {
	private addUsMode = false;
	private usList = [];
	private userStory = new UserStory();
	private previousUserStory = new Array<UserStory>();


	public usSprintSelection = [];

	@Input('project')
	public project: Project;

	// private idUS = 1;
	// private index = 10;

	private repositoryForm: FormGroup;
	// private userStoryForm: FormGroup;

	constructor(
		private el: ElementRef,
		private fb: FormBuilder,
		private lc: NgZone,
		private http: HttpClient
	) {
		/*this.repositoryForm = this.fb.group({
			url: [null, [Validators.required, CustomValidators.url]]
		});*/
		/*this.userStoryForm = this.fb.group({
			id: [{value: this.idUS, disabled: true}, []],
			description: ["", [Validators.required, Validators.minLength(10)]],
			difficulty: [0,[Validators.required, CustomValidators.number]],
			priority: [0,[Validators.required, CustomValidators.number]],
			state: ["",[Validators.required, Validators.minLength(1)]],
		})*/
		/*this.userStoryForm = this.fb.group({
      backlog: this.fb.array([])
    })*/
	}

	/*get backlog(): FormArray {
		return <FormArray>this.userStoryForm.get('backlog')
	}*/


	ngOnInit() {
		this.loadUserStories();
	}

	loadUserStories(): void {
		this.http.get<UserStory[]>(url_uStories + '/' + this.project.id).subscribe((result) => {
			this.usList = result;
			console.log(this.usList);
		}, error => console.log(error));
	}

	/*initItems(): FormGroup {
		return this.fb.group({
			id: [{ value: this.idUS, disabled: true }, []],
			description: ["", [Validators.required, Validators.minLength(10)]],
			difficulty: [0, [Validators.required, CustomValidators.number]],
			priority: [0, [Validators.required, CustomValidators.number]],
			state: ["", [Validators.required, Validators.minLength(1)]],
		});
	}*/


	resetModel() {
		this.userStory.id = -1;
		this.userStory.description = '';
		this.userStory.difficulty = 0;
		this.userStory.priority = 0;
		this.userStory.state = 'TODO';
		this.userStory.onEdit = false;
	}

	onEditRow(ligne) {
		const tr_id = '#US' + ligne['id'];
		ligne['onEdit'] = true;
		this.previousUserStory.push(Object.assign(new UserStory(), ligne));
		this.el.nativeElement.querySelector(tr_id).classList.add('table-info');
		const tab = this.el.nativeElement.querySelectorAll(tr_id + ' .editable');
		for (let i = 0; i < tab.length; ++i) {
			tab[i].setAttribute('contenteditable', 'true');
		}
	}

	onBackRow(ligne) {
		const tr_id = '#US' + ligne['id'];
		const save = this.previousUserStory.filter((us) => us.id === ligne.id)[0];
		ligne['description'] = save.description;
		ligne['difficulty'] = save.difficulty;
		ligne['priority'] = save.priority;
		ligne['state'] = save.state;
		ligne['onEdit'] = false;
		this.previousUserStory.splice(this.previousUserStory.indexOf(save), 1);
		this.el.nativeElement.querySelector(tr_id).classList.remove('table-info');
		const tab = this.el.nativeElement.querySelectorAll(tr_id + ' .editable');
		for (let i = 0; i < tab.length; ++i) {
			tab[i].setAttribute('contenteditable', 'false');
		}
	}

	onConfirmRow(ligne) {
		const tr_id = '#US' + ligne['id'];
		const urlRequest = url_uStory + '/' + this.project.id + '/' + ligne['id'];
		this.http.patch(urlRequest, ligne)
			.subscribe((result: any) => {
				if (result.error) {
					console.log(result);
				}
			}, err => {
				console.log(err);
			});
		const save = this.previousUserStory.filter((us) => us.id === ligne.id)[0];
		this.previousUserStory.splice(this.previousUserStory.indexOf(save), 1);
		this.el.nativeElement.querySelector(tr_id).classList.remove('table-info');
		const tab = this.el.nativeElement.querySelectorAll(tr_id + ' .editable');
		for (let i = 0; i < tab.length; ++i) {
			tab[i].setAttribute('contenteditable', 'false');
		}
		ligne['onEdit'] = false;
	}

	onDeleteRow(ligne) {
		const urlRequest = url_uStory + '/' + this.project.id + '/' + ligne['id'];
		this.http.delete(urlRequest)
			.subscribe((result: any) => {
				if (result.error) {
					console.log(result);
				} else {
					const i = this.usList.indexOf(ligne);
					this.usList.splice(i, 1);
				}
			}, err => {
				console.log(err);
			});
	}

	onEdit() {
		this.addUsMode = true;
		// this.backlog.push(this.initItems());
	}

	onBack() {
		this.addUsMode = false;
	}

	onConfirm() {
		this.addUsMode = false;
		const urlRequest = url_uStories + '/' + this.project.id;
		this.http.post(urlRequest, this.userStory)
			.subscribe((result: any) => {
				if (result.error) {
					console.log(result);
				} else {
					this.loadUserStories();
				}
			}, err => {
				console.log(err);
			});
		this.resetModel();
	}


	removeProject() {

	}

	selectUS(ligne) {
		if (!ligne.onEdit) {
			const tr_id = '#US' + ligne['id'];
			const classes = this.el.nativeElement.querySelector(tr_id).classList;
			if (classes.contains('table-warning')) {
				classes.remove('table-warning');
				/* if (usSprintSelection.count === 0) {
					const buttons = this.el.nativeElement.querySelector(tr_id + ' td button');
					for (let i = 0; i < buttons.length; ++i) {
						buttons[i].disabled = false;
					}
				}*/
			} else {
				classes.add('table-warning');
				/* if (usSprintSelection.count == 1) {
					const buttons = this.el.nativeElement.querySelector(tr_id + ' td button');
					for (let i = 0; i < buttons.length; ++i) {
						buttons[i].disabled = true;
					}
				}*/
			}
			this.usSprintSelection.push(ligne);
		}
	}

}
