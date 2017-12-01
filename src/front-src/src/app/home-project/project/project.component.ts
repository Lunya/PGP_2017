import { Component, OnInit, NgZone, Input } from '@angular/core';
import { UserStory } from '../../objects/UserStory';
import { ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

const url = 'http://localhost:3000/api/userstory/';
const url2 = 'http://localhost:3000/api/userstories/';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.css'],
})


export class ProjectComponent implements OnInit {
	private projectName = "MyProject";
	private addUsMode = false;
	private haveURL = false;

	private usList = [];
	private usModel = {
		id: 0,
		description: '',
		difficulty: 0,
		priority: 0,
		status: '',
		onEdit: false
	};

	@Input('project')
	public project: {
		id: number, name: string,
		description: string,
		begin: Date, end: Date };

	private idUS = 1;
	private index = 10;

	private repositoryForm: FormGroup;
	//private userStoryForm: FormGroup;

	constructor(
		private el: ElementRef,
		private fb: FormBuilder,
		private lc: NgZone,
		private http: HttpClient
	) {
		this.repositoryForm = this.fb.group({
			url: [null, [Validators.required, CustomValidators.url]]
		});
		/*this.userStoryForm = this.fb.group({
			id: [{value: this.idUS, disabled: true}, []],
			description: ["", [Validators.required, Validators.minLength(10)]],
			difficulty: [0,[Validators.required, CustomValidators.number]],
			priority: [0,[Validators.required, CustomValidators.number]],
			status: ["",[Validators.required, Validators.minLength(1)]],
		})*/
		/*this.userStoryForm = this.fb.group({
      backlog: this.fb.array([])
    })*/
	}

	/*get backlog(): FormArray {
		return <FormArray>this.userStoryForm.get('backlog')
	}*/


	ngOnInit() {
	}

	initItems(): FormGroup {
		return this.fb.group({
			id: [{ value: this.idUS, disabled: true }, []],
			description: ["", [Validators.required, Validators.minLength(10)]],
			difficulty: [0, [Validators.required, CustomValidators.number]],
			priority: [0, [Validators.required, CustomValidators.number]],
			status: ["", [Validators.required, Validators.minLength(1)]],
		});
	}


	resetModel() {
		this.usModel.id = 0;
		this.usModel.description = '';
		this.usModel.difficulty = 0;
		this.usModel.priority = 0;
		this.usModel.status = '';
		this.usModel.onEdit = false;
	}

	onEditRow(ligne) {
		ligne['onEdit'] = true;
		let tr_id = "#US" + ligne['id'];
		this.el.nativeElement.querySelector(tr_id).classList.add("table-info");
		let tab = this.el.nativeElement.querySelectorAll(tr_id + " .editable");
		for (let i = 0; i < tab.length; ++i) {
			tab[i].setAttribute('contenteditable', 'true');
		}
	}

	onBackRow(ligne) {
		ligne['onEdit'] = false;
		let tr_id = "#US" + ligne['id'];
		this.el.nativeElement.querySelector(tr_id).classList.remove("table-info");
		let tab = this.el.nativeElement.querySelectorAll(tr_id + " .editable");
		for (let i = 0; i < tab.length; ++i) {
			tab[i].setAttribute('contenteditable', 'false');
		}
	}

	onConfirmRow(ligne) {
		ligne['onEdit'] = false;
		let tr_id = "#US" + ligne['id'];
		/*let urlRequest = url + this.project.id + "/" + ligne['id'];
		this.http.patch(urlRequest, ligne)
			.subscribe((result: any) => {
				if (result.error)
					console.log(result);
			}, err => {
				console.log(err);
			});*/
		this.el.nativeElement.querySelector(tr_id).classList.remove("table-info");
		let tab = this.el.nativeElement.querySelectorAll(tr_id + " .editable");
		for (let i = 0; i < tab.length; ++i) {
			tab[i].setAttribute('contenteditable', 'false');
		}
	}

	onDeleteRow(ligne) {
		let i = this.usList.indexOf(ligne);
		this.usList.splice(i, 1);
		/*let urlRequest = url + this.project.id + "/" + ligne['id'];
		this.http.delete(urlRequest, ligne)
			.subscribe((result: any) => {
				if (result.error)
					console.log(result);
			}, err => {
				console.log(err);
			});*/
	}

	onEdit() {
		this.addUsMode = true;
		//this.backlog.push(this.initItems());
	}

	onBack() {
		this.addUsMode = false;
	}

	onConfirm() {
		this.addUsMode = false;
		/*let urlRequest = url2 + this.project.id;
		this.http.post(urlRequest, this.userStoryForm.value)
			.subscribe((result: any) => {
				if (result.error)
					console.log(result);
			}, err => {
				console.log(err);
			});*/

		this.usList.push(new UserStory(
			this.idUS,
			this.usModel.description,
			this.usModel.difficulty,
			this.usModel.priority,
			this.usModel.status
		));
		this.idUS++;
		this.resetModel();

	}

	submitURL() {
		this.haveURL = true;
	}

	editURL() {
		this.haveURL = false;
	}

	removeProject() {

	}

}
