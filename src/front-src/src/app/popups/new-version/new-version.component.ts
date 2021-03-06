import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../objects/Project';

const versionUrl = 'http://localhost:3000/api/version';

@Component({
	selector: 'app-new-version',
	templateUrl: './popup-version.component.html'
})
export class NewVersionComponent {
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
			versionMaj: [1, [Validators.required]],
			versionMin: [0, [Validators.required]],
			linkBld: [null, [Validators.required, CustomValidators.url]],
			linkSrc: [null, [Validators.required, CustomValidators.url]],
			linkDoc: [null, [CustomValidators.url]],
			linkTst: [null, [CustomValidators.url]]
		});
		this.formAction = 'New';
	}

	ngOnSubmit(event): void {
		event.preventDefault();
		const values = this.versionForm.value;
		console.log(this.project);
		values.idProject = this.project.id;
		console.log(values);
		this.http.post(versionUrl + '/' + this.project.id , values).subscribe((value: any) => {
			if (value.error) {
				console.log(value);
			} else {
				console.log(value);
				this.activeModal.close(value);
			}
		}, error => console.log(error));
	}
}
