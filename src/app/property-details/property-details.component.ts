import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpRequest, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {
  imgUrl: string = '/assets/Files/default-image.png';
  fileToUpload: File = null;

  public progress: number;
  public message: string;
  info = null;
  len=null;
  constructor(private service: UserService, private activatedRoute:ActivatedRoute, private http: HttpClient, private toaster : ToastrService ) { }

  ngOnInit() {
    let id = +this.activatedRoute.snapshot.paramMap.get('id');

    this.service.GetMortgagedHouse(id)
    .subscribe(result =>{
      console.log('details:', result);
      this.info = result;
    });
    this.len = this.info.length
    console.log(this.len)

    // for(var n =1; n<=5; n++){

    // }
  }

  handleFileInput(file: FileList){
    this.fileToUpload = file.item(0);


    //Image Preview
    var reader = new FileReader();
    reader.onload = (event:any)=>{
      this.imgUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }


  OnSubmit(files){
    this.service.uploadFile(this.fileToUpload)
    .subscribe(
      data =>{
        console.log("Done!!!");
        // Caption.Value = null;
        files.Value = null;
      }
    )

  }

  title = 'Upload Multiple Files in Angular 4';

  myFiles:string [] = [];
  sMsg:string = '';

  

  getFileDetails (e) {
    //console.log (e.target.files);
    for (var i = 0; i < e.target.files.length; i++) { 
      this.myFiles.push(e.target.files[i]);
    }
  }

  uploadFiles () {
    const frmData = new FormData();
    
    for (var i = 0; i < this.myFiles.length; i++) { 
      frmData.append("fileUpload", this.myFiles[i]);
    }
    
    this.http.post(this.service.baseURI+'/files/Upload/', frmData).subscribe(
      data => {
        // SHOW A MESSAGE RECEIVED FROM THE WEB API.
        this.sMsg = data as string;
        console.log (this.sMsg);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);    // Show error, if any.
      }
    );

  
  }

  uploading(files) {
    if (files.length === 0)
      return;
    const formData = new FormData();
    for (let file of files)
      formData.append(file.name, file);
    const uploadReq = new HttpRequest('POST', `http://localhost:49755/api/UploadAllFiles`, formData, {
      reportProgress: true,
    });
    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response)
        this.message = event.body.toString();
    });
  }
}


  