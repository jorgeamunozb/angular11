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

    saveProject(projec: Project): Observable<Object> {
        let params = JSON.stringify(projec);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'save-project', params, { headers });
    }

}