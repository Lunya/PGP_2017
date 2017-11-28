import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SprintComponent } from './sprint/sprint.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from '../popups/add-user/add-user.component';
import { EditSprintComponent } from '../popups/edit-sprint/edit-sprint.component';
import { ProjectComponent } from './project/project.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';

@Component({
	selector: 'app-home-project',
	templateUrl: './home-project.component.html',
	styleUrls: ['./home-project.component.css'],
	entryComponents: [
		NgbModalBackdrop,
		ProjectComponent,
		SprintComponent,
		UserInfoComponent
	]
})
export class HomeProjectComponent implements OnInit, OnDestroy {
	private subPar: any;

	private projectId: number;

	@ViewChild(SidebarComponent)
	public sidebar: SidebarComponent;

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

		let projectComponentFactory = this.cfr.resolveComponentFactory(ProjectComponent);
		let sprintComponentFactory = this.cfr.resolveComponentFactory(SprintComponent);
		let userComponentFactory = this.cfr.resolveComponentFactory(UserInfoComponent);

		this.sidebar.onSelectProject.subscribe(() => {
			this.pageContent.remove();
			const projectFactory = this.pageContent.createComponent(projectComponentFactory);
		});

		this.sidebar.onSelectSprint.subscribe(sprintId => {
			this.pageContent.remove();
			let sprintComponent = this.pageContent.createComponent(sprintComponentFactory);
			sprintComponent.instance.setSprintId(sprintId);
		});

		this.sidebar.onNewSprint.subscribe(() => {
			const modalRef = this.modalService.open(EditSprintComponent);
		});

		this.sidebar.onSelectUser.subscribe(userId => {
			this.pageContent.remove();
			let userComponent = this.pageContent.createComponent(userComponentFactory);
			userComponent.instance.setId(userId);
		});

		this.sidebar.onAddUser.subscribe(() => {
			const modalRef = this.modalService.open(AddUserComponent);
		});
	}

	ngOnDestroy() {
		this.subPar.unsubscribe();
	}
}
