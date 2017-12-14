import { Component, OnInit, ElementRef, NgZone, Input } from '@angular/core';
import { Project } from '../../objects/Project';
import { Version } from '../../objects/Version';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';


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

  @Input('project')
  public project: Project;

  constructor(
    private el: ElementRef,
    private http: HttpClient,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.loadVersion();
  }

  loadVersion(): void {
		this.http.get<Version[]>(urlVersion + 's/' + this.project.id).subscribe((result) => {
			  this.versionList = result;
		}, error => console.log(error));
	}

  public setVersion(versionFrom): void {
		this.versionList = versionFrom;
	}

}
