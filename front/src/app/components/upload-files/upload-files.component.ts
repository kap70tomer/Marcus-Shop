import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UploadFilesService } from '../../services/upload-files.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})

export class UploadFilesComponent implements OnInit {

  title = 'UploadFile';

  // Enables getting a reference to the dom element who's named #fileUpload
  @ViewChild("fileUpload", { static: false }) 
  fileUpload: ElementRef; 

  public files = [];
  public uploadedImageName;

  constructor(private uploadService: UploadFilesService) { }

  ngOnInit(): void {
    console.log("init Admin Panel");
  }

  onClick() {
    // Clearing the files from previous upload
    this.files = [];

    // Extracting a reference to the DOM element named #fileUpload
    const fileUpload = this.fileUpload.nativeElement; 
    fileUpload.onchange = () => {
     
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        console.log(file.name);
        this.files.push({ name: file.name, data: file, inProgress: false, progress: 0 });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    console.log(formData);
    file.inProgress = true;
    let ob = this.uploadService.upload(formData);
   
   
    ob.pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      }));
      ob.subscribe((event: any) => {
        if (typeof (event) === 'object' && event.body) {
          console.log("Body : " + JSON.stringify(event.body));
          this.uploadedImageName = event.body.name;
          this.uploadService.uploadedImageName = this.uploadedImageName;
        }
      });
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';

    console.log("Amount of files to upload : " + this.files.length);
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

}
