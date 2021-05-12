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
  private keyProject = 'project';

  constructor(
    private projectService: ProjectService,
    private uploadService: UploadService,
    private route: ActivatedRoute
  ) {
    this.url = Global.url;
    this.title = 'Editar proyecto';
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      response => {
        this.getProject(response.id);
      }
    );
  }

  getProject(id: string): void {
    this.projectService.getProject(id).subscribe(
      response => {
        this.project = response[this.keyProject];
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(): void {
    this.projectService.editProject(this.project).subscribe(
      response => {
        this.project = response[this.keyProject];
        this.status = 'success-edited';
      },
      error => {
        this.status = 'failed-edited';
        console.log(error);
      }
    );
  }

  fileChangeEvent(projectId: string, fileInput: any): void {
    this.filesToUpload = fileInput.target.files as Array<File>;
    if (this.project && this.filesToUpload) {
      this.uploadService.makeFileRequest(projectId, this.filesToUpload)
        .then((result: any) => {
          this.project = result[this.keyProject];
        });
    }
  }

}
