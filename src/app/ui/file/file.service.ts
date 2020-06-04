import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignupService } from 'src/app/pages/signup/signup.service';

@Injectable({ providedIn: 'root' })
export class FileService {

  constructor(private http: HttpClient) {}

  TBRD_API_PORT = '8090';

  public async uploadFile(file: File, repo_id: number): Promise<any> {

    const formData = new FormData();
    formData.append('file', file, file.name);

    const response = await this.http.post(`http://localhost:`+this.TBRD_API_PORT+`/api/v1.0/file_upload/`+repo_id, formData).toPromise();

    return response[0]['data_url']
  }

}

