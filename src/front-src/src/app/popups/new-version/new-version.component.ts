import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient } from '@angular/common/http';

import { Project } from '../../objects/Project';

const versionUrl = 'http://localhost:3000/api/version';

@Component({
	selector: 'app-new-version',
	templateUrl: './popup-version.component.html'
})
export class NewVersionComponent implements OnInit, OnDestroy {
	private versionForm: FormGroup;
	private formAction: string;

	@Input('project')
	public project: Project;


	constructor(
		public activeModal: NgbActiveModal,
		private fb: FormBuilder,
		private http: HttpClient
  	) {

		this.versionForm = this.fb.group({
			num_version_maj: [1, [Validators.required]],
      num_version_min: [0, [Validators.required]],
      link_build: [null, [Validators.required]],
      link_source: [null, [Validators.required]],
      link_doc: [null],
      link_test: [null]
		});
		this.formAction = 'New';
	}

	ngOnInit() {
		console.log('AddVersionComponent initialized');
	}

	ngOnDestroy() {
		console.log('AddVersionComponent destroyed');
	}

	ngOnSubmit(event): void {
		event.preventDefault();
		const values = this.versionForm.value;
		console.log(this.project);
		values.idProject = this.project.id;
		console.log(values);
		this.http.post(versionUrl, values).subscribe((value: any) => {
			if (value.error) {
				console.log(value);
			} else {
				console.log(value);
				this.activeModal.close(value);
			}
		}, error => console.log(error));
	}
}
