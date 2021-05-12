import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Global } from './global';

@Injectable()
export class UploadService {

    makeFileRequest(projectId: string, files: Array<File>): Promise<object> {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            const xhr = new XMLHttpRequest();

            for (const row of files) {
                formData.append('image', row, row.name);
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.open('POST', Global.url + 'upload-image/' + projectId, true);
            xhr.send(formData);
        });
    }

}
