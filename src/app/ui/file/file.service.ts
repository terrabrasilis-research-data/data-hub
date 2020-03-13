import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileService {

  constructor(private http: HttpClient) {}

  public uploadFile(file: File, repo_id: number): Promise<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    let result = this.http.post(`http://localhost:8090/api/v1.0/file_upload/`+repo_id, formData).toPromise();
    return result;
  }
}

