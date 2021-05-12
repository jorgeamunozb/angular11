import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/model/project';
import { Global } from 'src/app/service/global';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {

  public project: Project;
  public url: string;
  public willYouDelete = false;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.getProject(id);
    });
  }

  getProject(id: string): void {
    this.projectService.getProject(id).subscribe(
      response => {
        const keyProject = 'project';
        this.project = response[keyProject];
      },
      error => {
        console.log(error);
      });
  }

  onDelete(): void {
    this.willYouDelete = true;
  }

  onCancelDelete(): void {
    this.willYouDelete = false;
  }

  onConfirmDelete(id: string): void {
    this.projectService.deleteProject(id).subscribe(
      response => {
        const keyProject = 'project';
        if (response[keyProject]) {
          this.router.navigate(['/proyectos']);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
