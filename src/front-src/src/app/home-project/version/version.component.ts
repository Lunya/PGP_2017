import { Component, OnInit, ElementRef, NgZone, Input } from '@angular/core';
import { Project } from '../../objects/Project';
import { Version } from '../../objects/Version';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

const urlVersion = 'http://localhost:3000/api/version';

@Component({
	selector: 'app-version',
	templateUrl: './version.component.html',
	styleUrls: ['./version.component.css']
})
export class VersionComponent implements OnInit {


	public version : Version;
	public versionTableView = false;
	private versionList = [];
	private previousVersion = new Array<Version>();

	@Input('project')
	public project: Project;

	constructor(
		private el: ElementRef,
		private http: HttpClient,
		private modalService: NgbModal,
		private auth: AuthService
	) { }

	ngOnInit() {
		this.loadVersion();
	}

	loadVersion(): void {
		this.http.get<Version[]>(urlVersion + 's/' + this.project.id).subscribe((result) => {
			console.log(result);
			this.versionList = result;
		}, error => console.log(error));
	}

	public setVersion(versionFrom): void {
		this.versionList = versionFrom;
	}

	versionsView(value) {
		this.versionTableView = value;
	}

	onDeleteVersionRow(ligne) {
		const urlRequest = urlVersion + '/' + this.project.id + '/' + ligne['id'];
		let headers = new HttpHeaders();
		headers = this.auth.addAuthHeader(headers);
		this.http.delete(urlRequest, { headers: headers })
			.subscribe((result: any) => {
				if (result.error) {
					console.log(result);
				} else {
					const i = this.versionList.indexOf(ligne);
					this.versionList.splice(i, 1);
				}
			}, err => {
				console.log(err);
			});
	}

	onEditVersionRow(ligne) {
		const tr_id = '#Version' + ligne['id'];
		ligne['onEdit'] = true;
		this.previousVersion.push(Object.assign(new Version(), ligne));
		this.el.nativeElement.querySelector(tr_id).classList.add('table-info');
		const tab = this.el.nativeElement.querySelectorAll(tr_id + ' .editable');
		for (let i = 0; i < tab.length; ++i) {
			tab[i].setAttribute('contenteditable', 'true');
		}
	}

	onConfirmVersionRow(ligne) {
		const tr_id = '#Version' + ligne['id'];
		const urlRequest = urlVersion + '/' + this.project.id + '/' + ligne['id'];
		let headers = new HttpHeaders();
		headers = this.auth.addAuthHeader(headers);
		this.http.patch(urlRequest, ligne, { headers: headers })
			.subscribe((result: any) => {
				if (result.error) {
					console.log(result);
				}
			}, err => {
				console.log(err);
			});
		const save = this.previousVersion.filter((version) => version.id === ligne.id)[0];
		this.previousVersion.splice(this.previousVersion.indexOf(save), 1);
		this.el.nativeElement.querySelector(tr_id).classList.remove('table-info');
		const tab = this.el.nativeElement.querySelectorAll(tr_id + ' .editable');
		for (let i = 0; i < tab.length; ++i) {
			tab[i].setAttribute('contenteditable', 'false');
		}
		ligne['onEdit'] = false;
	}

	onBackVersionRow(ligne) {
		const tr_id = '#Version' + ligne['id'];
		const save = this.previousVersion.filter((version) => version.id === ligne.id)[0];
		ligne['num_version_maj'] = save.numVersionMaj;
		ligne['link_source'] = save.linkSource;
		ligne['link_build'] = save.linkBuild;
		ligne['link_test'] = save.linkTest;
		ligne['link_doc'] = save.linkDoc;
		ligne['onEdit'] = false;
		this.previousVersion.splice(this.previousVersion.indexOf(save), 1);
		this.el.nativeElement.querySelector(tr_id).classList.remove('table-info');
		const tab = this.el.nativeElement.querySelectorAll(tr_id + ' .editable');
		for (let i = 0; i < tab.length; ++i) {
			tab[i].setAttribute('contenteditable', 'false');
		}
	}
}
