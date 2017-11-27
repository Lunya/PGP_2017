import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-add-user',
	templateUrl: './add-user.component.html',
	styleUrls: ['./add-user.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class AddUserComponent implements OnInit, OnDestroy {

	constructor(
		public activeModal: NgbActiveModal
	) { }

	ngOnInit() {
		console.log('AddUserComponent initialized');
	}

	ngOnDestroy() {
		console.log('AddUserComponent destroyed');
	}
}
