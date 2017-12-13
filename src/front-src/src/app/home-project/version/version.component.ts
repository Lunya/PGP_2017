import { Component, OnInit, ElementRef } from '@angular/core';
import { Project } from '../../objects/Project';
import { Version } from '../../objects/Version';


const urlVersion = 'http://localhost:3000/api/version';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent implements OnInit {


  public version : Version;
  public versionTableView = false;

  @Input('project')
  public project: Project;

  constructor(
    private el: ElementRef,
    private http: HttpClient,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

}
