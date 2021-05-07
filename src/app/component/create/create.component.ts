import { Component, OnInit } from '@angular/core';
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

  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: Array<File>;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
    this.title = "Crear proyecto";
    this.project = new Project('', '', '', '', 2020, '', '');
  }

  ngOnInit(): void {
  }

  onSubmit(projectForm: any): void {
    this._projectService.saveProject(this.project)
      .subscribe(response => {
        const project: Project = response["project"];

        if (project && this.filesToUpload) {
          this._uploadService.makeFileRequest(project._id, this.filesToUpload)
            .then((result: Project) => {
              this.status = "success";
              projectForm.reset();
            });
        } else {
          this.status = "failed";
        }
      },
        error => {
          console.log(<any>error);
        }
      );
  };

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }


}
