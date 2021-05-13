import { Injectable } from '@angular/core';
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

            const uri = projectId ? 'upload-image/' : 'upload-image';
            xhr.open('POST', `${Global.url}${uri}${projectId}`, true);
            xhr.send(formData);
        });
    }

}
