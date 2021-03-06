import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Sprint } from '../../objects/Sprint';
import { User } from '../../objects/User';
import { Version } from '../../objects/Version';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
	private content: {
		sprints: Array<Sprint>,
		users: Array<User>,
		versions: Array<Version>};

	@Output() onSelectProject = new EventEmitter<void>();
	@Output() onSelectSprint = new EventEmitter < { sprint: Sprint; developers: User[]; } > ();
	@Output() onNewSprint = new EventEmitter<void>();
	@Output() onSelectUser = new EventEmitter<User>();
	@Output() onAddUser = new EventEmitter<void>();
	@Output() onAccessVersions = new EventEmitter<Version[]>();
	@Output() onAddVersion = new EventEmitter<void>();

	@ViewChild('version') private versionElement: ElementRef;
	@ViewChild('project') private projectElement: ElementRef;
	@ViewChild('sprints') private sprintsElement: ElementRef;
	@ViewChild('users') private usersElement: ElementRef;

	constructor() { }

	ngOnInit() {
		this.content = { sprints: [], users: [], versions: [] };
		this.onProjectSelected();
	}


	setContent(content): void {
		this.content = content;
	}

	private unselectAllItemsAndSelectOne(element: HTMLElement): void {
		this.projectElement.nativeElement.classList.remove('active');
		this.sprintsElement.nativeElement.querySelectorAll('.active').forEach(e => e.classList.remove('active'));
		this.usersElement.nativeElement.querySelectorAll('.active').forEach(e => e.classList.remove('active'));
		this.versionElement.nativeElement.classList.remove('active');
		element.classList.add('active');
	}

	onProjectSelected(): void {
		this.onSelectProject.emit();
		this.unselectAllItemsAndSelectOne(this.projectElement.nativeElement);
	}

	onSprintSelected(event: MouseEvent, sprint: Sprint): void {
		this.onSelectSprint.emit({sprint: sprint, developers: this.content.users});
		const target: any = event.target || event.srcElement || event.currentTarget;
		this.unselectAllItemsAndSelectOne(target);
	}

	onUserSelected(event: MouseEvent, user: User): void {
		this.onSelectUser.emit(user);
		const target: any = event.currentTarget;
		this.unselectAllItemsAndSelectOne(target);
	}


	onUserAdd(): void {
		this.onAddUser.emit();
	}


	onVersionsAccess(event: MouseEvent): void {
		this.onAccessVersions.emit(this.content.versions);
		const target: any = event.currentTarget;
		this.unselectAllItemsAndSelectOne(target);
	}

	onVersionAdd(): void {
		this.onAddVersion.emit();
	}
}
