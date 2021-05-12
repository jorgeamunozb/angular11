import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../model/project';
import { Global } from './global';

@Injectable()
export class ProjectService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = Global.url;
    }

    saveProject(project: Project): Observable<Object> {
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(`${this.url}save-project`, params, { headers });
    }

    getProjects(): Observable<Object> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${this.url}projects`, { headers });
    }

    getProject(id: string): Observable<Object> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${this.url}project/${id}`, { headers });
    }

    deleteProject(id: string): Observable<Object> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(`${this.url}delete-project/${id}`, { headers });
    }

    editProject(project: Project): Observable<Object> {
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(`${this.url}update-project/${project._id}`, params, { headers });
    }

}