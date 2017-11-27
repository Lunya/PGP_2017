import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

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

	constructor(
		public activeModal: NgbActiveModal,
		private fb: FormBuilder,
		private datepickerConfig: NgbDatepickerConfig
	) {
		this.sprintForm = this.fb.group({
			begin: [new Date(), [Validators.required, CustomValidators.dateISO]],
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
}
