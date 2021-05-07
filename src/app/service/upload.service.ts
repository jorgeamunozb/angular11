import { Injectable } from '@angular/core';
import { Global } from './global';

@Injectable()
export class UploadService {

    makeFileRequest(projectId: string, files: Array<File>): Promise<Object> {
        return new Promise(function (resolve, reject) {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            for (var i = 0; i < files.length; i++) {
                formData.append("image", files[i], files[i].name);
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }

            xhr.open('POST', Global.url + 'upload-image/' + projectId, true);
            xhr.send(formData);
        });
    };

};