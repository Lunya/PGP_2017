import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SprintComponent } from './sprint/sprint.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from '../popups/add-user/add-user.component';
import { EditSprintComponent } from '../popups/edit-sprint/edit-sprint.component';

@Component({
	selector: 'app-home-project',
	templateUrl: './home-project.component.html',
	styleUrls: ['./home-project.component.css']
})
export class HomeProjectComponent implements OnInit, OnDestroy {
	private subPar: any;

	private projectId: number;

	@ViewChild(SidebarComponent)
	private sidebar: SidebarComponent;

	@ViewChild('dynamicContent', { read: ViewContainerRef })
	private pageContent: ViewContainerRef;


	constructor(
		private route: ActivatedRoute,
		private cfr: ComponentFactoryResolver,
		private modalService: NgbModal
	) { }

	ngOnInit() {
		this.subPar = this.route.params.subscribe(params => {
			this.projectId = params['id'];
		});
		this.sidebar.setContent({
			sprints: [
				{ id: 1, name: 'sprint 1'},
				{ id: 2, name: 'sprint 2'}
			], users: [
				{ id: 1, name: 'user 1', email: 'email1@aa.aa' },
				{ id: 2, name: 'user 2', email: 'email2@aa.aa' }
			]});

		let sprintComponentFactory = this.cfr.resolveComponentFactory(SprintComponent);
		let sprintComponent = this.pageContent.createComponent(sprintComponentFactory);

		this.sidebar.onSelectSprint.subscribe(sprintId => {
			console.log(sprintId);
		});

		this.sidebar.onNewSprint.subscribe(() => {
			const modalRef = this.modalService.open(EditSprintComponent);
		});

		this.sidebar.onAddUser.subscribe(() => {
			const modalRef = this.modalService.open(AddUserComponent);
		});
	}

	ngOnDestroy() {
		this.subPar.unsubscribe();
	}
}
