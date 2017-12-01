import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SprintComponent } from './sprint/sprint.component';
import { ProjectComponent } from './project/project.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from '../popups/add-user/add-user.component';
import { EditSprintComponent } from '../popups/edit-sprint/edit-sprint.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { HttpClient } from '@angular/common/http';

const projectUrl = 'http://localhost:3000/api/project';
const sprintUrl = 'http://localhost:3000/api/sprint';
const userUrl = 'http://localhost:3000/api/user';

@Component({
	selector: 'app-home-project',
	templateUrl: './home-project.component.html',
	styleUrls: ['./home-project.component.css']
})
export class HomeProjectComponent implements OnInit, OnDestroy {
	private subPar: any;

	private project = {
		id: -1, name: '',
		description: '',
		begin: new Date(), end: new Date()};

	@ViewChild(SidebarComponent)
	private sidebar: SidebarComponent;

	@ViewChild('dynamicContent', { read: ViewContainerRef })
	private pageContent: ViewContainerRef;


	constructor(
		private route: ActivatedRoute,
		private cfr: ComponentFactoryResolver,
		private modalService: NgbModal,
		private http: HttpClient
	) { }

	ngOnInit() {
		this.subPar = this.route.params.subscribe(params => {
			const projectId = params['id'];
			this.http.get(projectUrl + '/' + projectId).subscribe((result: any) => {
				this.project = result;
				this.sidebar.onSelectProject.emit();
				this.http.get(sprintUrl + 's/' + projectId).subscribe((sprints: any) => {
					this.http.get(userUrl + 's/' + projectId).subscribe( (users: any) => {
						this.sidebar.setContent({
							sprints: sprints,
							users: users
						});
						console.log(users);
					}, error => console.log(error));
				}, error => console.log(error));
			}, error => console.log(error));
		});

		this.sidebar.setContent({
			sprints: [
				{ id: 1, name: 'sprint 1'},
				{ id: 2, name: 'sprint 2'}
			], users: [
				{ id: 1, name: 'user 1', email: 'email1@aa.aa' },
				{ id: 2, name: 'user 2', email: 'email2@aa.aa' }
			]});


		const projectComponentFactory = this.cfr.resolveComponentFactory(ProjectComponent);

		const sprintComponentFactory = this.cfr.resolveComponentFactory(SprintComponent);
		const userComponentFactory = this.cfr.resolveComponentFactory(UserInfoComponent);

		this.sidebar.onSelectProject.subscribe(() => {
			this.pageContent.remove();
			const projectFactory = this.pageContent.createComponent(projectComponentFactory);
			projectFactory.instance.project = this.project;
		});

		this.sidebar.onSelectSprint.subscribe(sprintId => {
			this.pageContent.remove();
			const sprintComponent = this.pageContent.createComponent(sprintComponentFactory);
			sprintComponent.instance.setSprintId(sprintId);
		});

		this.sidebar.onNewSprint.subscribe(() => {
			const modalRef = this.modalService.open(EditSprintComponent);
		});

		this.sidebar.onSelectUser.subscribe(userId => {
			this.pageContent.remove();
			const userComponent = this.pageContent.createComponent(userComponentFactory);
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
