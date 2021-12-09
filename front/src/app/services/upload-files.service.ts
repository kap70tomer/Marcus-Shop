import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {
  public uploadedImageName="";

  constructor(private httpClient: HttpClient) {}
  
  public upload(formData) {
    return this.httpClient.post<any>("api/products/file", formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
