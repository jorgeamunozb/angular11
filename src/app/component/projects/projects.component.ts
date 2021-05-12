import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../service/project.service';
import { Project } from '../../model/project';
import { Global } from '../../service/global';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {

  public projects: Project[];
  public url: string;
  private keyProjects = 'projects';

  constructor(
    private projectService: ProjectService
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe(
      response => {
        this.projects = response[this.keyProjects];
      },
      error => {
        console.log(error);
      }
    );
  }

}
