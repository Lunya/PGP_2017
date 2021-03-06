import { Component, ComponentFactoryResolver, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SprintComponent } from './sprint/sprint.component';
import { ProjectComponent } from './project/project.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from '../popups/add-user/add-user.component';
import { NewSprintComponent } from '../popups/new-sprint/new-sprint.component';
import { NewVersionComponent } from '../popups/new-version/new-version.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../objects/Project';
import { User } from '../objects/User';
import { VersionComponent } from './version/version.component';
import { AuthService } from '../services/auth.service';

const projectUrl = 'http://localhost:3000/api/project';
const sprintUrl = 'http://localhost:3000/api/sprint';
const userUrl = 'http://localhost:3000/api/user';

const versionUrl = 'http://localhost:3000/api/version';
//const urlStatus = 'http://localhost:3000/api/status';



@Component({
	selector: 'app-home-project',
	templateUrl: './home-project.component.html',
	styleUrls: ['./home-project.component.css']
})
export class HomeProjectComponent implements OnInit, OnDestroy {
	private subPar: any;

	private project: Project;
	private developers = new Array<User>();
	private usSprint = [];
	private version = [];
	//private userStatus: any;


	@ViewChild(SidebarComponent)
	private sidebar: SidebarComponent;

	@ViewChild('dynamicContent', { read: ViewContainerRef })
	private pageContent: ViewContainerRef;


	constructor(
		private route: ActivatedRoute,
		private cfr: ComponentFactoryResolver,
		private modalService: NgbModal,
		private http: HttpClient,
		private el: ElementRef,
		private auth: AuthService
	) { }

	private updateSidebar(): void {
		let headers = new HttpHeaders();
		headers = this.auth.addAuthHeader(headers);
		this.http.get(sprintUrl + 's/' + this.project.id, { headers: headers }).subscribe((sprints: any) => {
			this.http.get(userUrl + 's/' + this.project.id, { headers: headers }).subscribe((users: any) => {
				this.http.get(versionUrl + 's/' + this.project.id, { headers: headers }).subscribe((versions: any) => {
					this.sidebar.setContent({
						sprints: sprints,
						users: users,
						versions: versions
					});
				}, error => console.log(error));
			}, error => console.log(error));
		}, error => console.log(error));
	}

	ngOnInit() {
		this.subPar = this.route.params.subscribe(params => {
			this.project = new Project();
			this.project.id = params['id'];
			let headers = new HttpHeaders();
			headers = this.auth.addAuthHeader(headers);

			this.http.get(projectUrl + '/' + this.project.id,  { headers: headers }).subscribe((result: any) => {
				this.http.get('http://localhost:3000/api/status/' + localStorage.getItem('user.id') + '/' + this.project.id,  { headers: headers }).subscribe((value: any) => {
					localStorage.setItem('user.status', value.status);
					this.project = result;
					this.project.status = value.status;
					this.sidebar.onSelectProject.emit(); // update project on load
					this.updateSidebar();
				}, error => console.log(error));

			}, error => console.log(error));
		});

		const projectComponentFactory = this.cfr.resolveComponentFactory(ProjectComponent);
		const sprintComponentFactory = this.cfr.resolveComponentFactory(SprintComponent);
		const userComponentFactory = this.cfr.resolveComponentFactory(UserInfoComponent);
		const versionComponentFactory = this.cfr.resolveComponentFactory(VersionComponent);

		this.sidebar.onSelectProject.subscribe(() => {
			this.pageContent.remove();
			const projectFactory = this.pageContent.createComponent(projectComponentFactory);
			projectFactory.instance.project = this.project;
			this.usSprint = projectFactory.instance.usSprintSelection;
		});


		this.sidebar.onSelectSprint.subscribe(sprint => {
			this.pageContent.remove();
			console.log(sprint);
			const sprintComponent = this.pageContent.createComponent(sprintComponentFactory);
			sprintComponent.instance.project = this.project;
			sprintComponent.instance.setSprint(sprint);
		});

		this.sidebar.onNewSprint.subscribe(() => {
			// if (projectFactory.instance.usSprintSelection.count > 0) {
			const modalRef = this.modalService.open(NewSprintComponent);
			modalRef.componentInstance.project = this.project;
			modalRef.componentInstance.usSelection = this.usSprint;
			modalRef.result
				.then(value => {
					this.updateSidebar();
					this.resetUsSelection();
				}).catch(reason => console.log(reason));
		});

		this.sidebar.onSelectUser.subscribe(user => {
			this.pageContent.remove();
			const userComponent = this.pageContent.createComponent(userComponentFactory);
			userComponent.instance.project = this.project;
			userComponent.instance.setUser(user);
		});

		this.sidebar.onAddUser.subscribe(() => {
			const modalRef = this.modalService.open(AddUserComponent);
			modalRef.componentInstance.project = this.project;
			modalRef.result
				.then(value => {
					this.updateSidebar();
					console.log(value);
				}).catch(reason => console.log(reason));
		});



		this.sidebar.onAccessVersions.subscribe(version => {
			this.pageContent.remove();
			const versionComponent = this.pageContent.createComponent(versionComponentFactory);
			versionComponent.instance.project = this.project;
			versionComponent.instance.setVersion(version);
		});




		this.sidebar.onAddVersion.subscribe(() => {
			const modalRef = this.modalService.open(NewVersionComponent);
			modalRef.componentInstance.project = this.project;
			modalRef.componentInstance.version = this.version;
			modalRef.result
				.then(value => {
					console.log(value);
				}).catch(reason => console.log(reason));
		});
	}

	resetUsSelection() {
		const  selection = this.el.nativeElement.querySelectorAll('.usID');
		for (let i = 0 ; i < selection.length; i ++ ) {
			selection[i].classList.remove('btn-primary');
			selection[i].classList.add('btn-outline-primary');
		}
	}

	ngOnDestroy() {
		this.subPar.unsubscribe();
	}
}
