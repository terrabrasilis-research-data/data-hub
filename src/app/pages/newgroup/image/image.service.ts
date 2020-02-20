import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImageService {

  constructor(private http: HttpClient) {}

  public uploadImage(image: File): Promise<any> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(`http://localhost:8090/api/v1.0/image_upload`, formData).toPromise();
  }
}

