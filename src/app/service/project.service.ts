import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../model/project';
import { Global } from './global';

@Injectable()
export class ProjectService {
    public url: string;

    constructor(private http: HttpClient) {
        this.url = Global.url;
    }

    saveProject(project: Project): Observable<object> {
        if (project) {
            return this.editProject(project);
        } else {
            const params = JSON.stringify(project);
            const headers = new HttpHeaders().set('Content-Type', 'application/json');
            return this.http.post(`${this.url}save-project`, params, { headers });
        }
    }

    getProjects(): Observable<object> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(`${this.url}projects`, { headers });
    }

    getProject(id: string): Observable<object> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(`${this.url}project/${id}`, { headers });
    }

    deleteProject(id: string): Observable<object> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.delete(`${this.url}delete-project/${id}`, { headers });
    }

    editProject(project: Project): Observable<object> {
        const params = JSON.stringify(project);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.put(`${this.url}update-project/${project.id}`, params, { headers });
    }

}
