import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../objects/Project';

const sprintUrl = 'http://localhost:3000/api/sprint';
@Component({
	selector: 'app-edit-sprint',
	templateUrl: './edit-sprint.component.html',
	styleUrls: ['./edit-sprint.component.css'],
	providers: [NgbDatepickerConfig]
})
export class EditSprintComponent implements OnInit, OnDestroy {
	private sprintForm: FormGroup;
	private formAction: string;
	private dateModel;

	@Input('project')
	public project: Project;

	constructor(
		public activeModal: NgbActiveModal,
		private fb: FormBuilder,
		private http: HttpClient,
		private datepickerConfig: NgbDatepickerConfig
	) {
		this.sprintForm = this.fb.group({
			begin: [new Date(), [Validators.required/*, CustomValidators.dateISO*/]],
			duration: [1, [Validators.required, CustomValidators.gte(1)]]
		});
		this.formAction = 'New';
	}

	ngOnInit() {
		console.log('AddUserComponent initialized');
	}

	ngOnDestroy() {
		console.log('AddUserComponent destroyed');
	}

	ngOnSubmit(event): void {
		event.preventDefault();
		const values = this.sprintForm.value;
		console.log(this.project);
		values.idProject = this.project.id;
		values.begin = new Date(values.begin.year, values.begin.month, values.begin.day);
		values.end = new Date(values.begin.getTime() + values.duration * 1000 * 60 * 60 * 24);
		console.log(values);
		this.http.post(sprintUrl, values).subscribe((value: any) => {
			if (value.error)
				console.log(value);
			else
				this.activeModal.close('Form validated');
		}, error => console.log(error));
	}
}
