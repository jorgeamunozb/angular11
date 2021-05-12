import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/model/project';
import { Global } from 'src/app/service/global';
import { ProjectService } from 'src/app/service/project.service';
import { UploadService } from '../../service/upload.service';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  public title: string;
  public project: Project;
  public status: string;
  public url: string;
  public filesToUpload: Array<File>;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
    this.title = "Editar proyecto";
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      response => {
        let id = response.id;

        this.getProject(id);
      }
    );
  };

  getProject(id: string): void {
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response["project"];
      },
      error => {
        console.log(<any>error);
      }
    );
  };

  onSubmit(): void {
    this._projectService.editProject(this.project).subscribe(
      response => {
        this.project = response["project"];
        this.status = "success-edited";
      },
      error => {
        this.status = "failed-edited";
        console.log(<any>error);
      }
    );
  };

  fileChangeEvent(projectId: string, fileInput: any): void {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    if (this.project && this.filesToUpload) {
      this._uploadService.makeFileRequest(projectId, this.filesToUpload)
        .then((result: any) => {
          this.project = result["project"];
        });
    }
  };

}
