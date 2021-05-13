import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/service/global';
import { Project } from '../../model/project';
import { ProjectService } from '../../service/project.service';
import { UploadService } from '../../service/upload.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public url: string;
  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: Array<File>;
  public projectCreatedId: string;
  private keyProject = 'project';

  constructor(
    private projectService: ProjectService,
    private uploadService: UploadService
  ) {
    this.url = Global.url;
    this.title = 'Crear proyecto';
    this.project = new Project('', '', '', '', 2020, '', '');
  }

  ngOnInit(): void {
  }

  onSubmit(projectForm: any): void {
    this.projectService.saveProject(this.project).subscribe(
      response => {
        const project: Project = response[this.keyProject];
        if (project && this.filesToUpload) {
          this.uploadService.makeFileRequest(project.id, this.filesToUpload)
            .then((result: any) => {
              this.projectCreatedId = result.project.id;
              this.status = 'success';
              projectForm.reset();
            });
        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  fileChangeEvent(projectId: string, fileInput: any): void {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    if (this.filesToUpload) {
      this.uploadService.makeFileRequest(projectId, this.filesToUpload)
        .then(
          result => {
            this.project = result[this.keyProject];
          },
          error => {
            console.log(error);
          });
    }
  }

}
