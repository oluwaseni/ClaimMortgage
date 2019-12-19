import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly baseURI = 'http://localhost:49755/API';

  readonly BaseURI = 'http://localhost:52540/api';
 
  formData?: any ={}
  element: any={}
  list: any[];
  constructor(private fb: FormBuilder, private http:HttpClient) { }

  formModel?:any = this.fb.group({
    username: ['', Validators.required],
    Email: ['', Validators.email],
    Fullname: [''],
    sortCode: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required],
    },
    {Validator : this.comparePasswords})
   
  });

  


  
  formModelProperty?:any = this.fb.group({
    LandOwnerName: ['', Validators.required],
    PropertyType: ['', Validators.required],
    PercentageMortgaged: ['', Validators.required],
    BankMortgaging: [''],
    NatureOfDeeds: [''],
    Registered: [''],
    Volume: [''],
    Number: [''],
    Page: [''],
    PlanNumber: [''],
    ReceiptNumber: [''],
    FileReference: [''],
    SerialNumber: ['']
   
   
  });


   
  postMortgages(body){
   
    return this.http.post(this.baseURI+'/PropertyMortgages', body);
  }


  comparePasswords(fb: FormGroup){
    let ConfirmPswdCtrl = fb.get('ConfirmPassword');

    if(ConfirmPswdCtrl.errors == null || 'passwordMismatch' in ConfirmPswdCtrl.errors){
      if(fb.get('Password').value!= ConfirmPswdCtrl.value)
      ConfirmPswdCtrl.setErrors({passwordMismatch: true}); 
      else ConfirmPswdCtrl.setErrors(null)
    }
  }


  registration(){
    var body= {
      UserName: this.formModel.value.username,
      Email: this.formModel.value.email,
      Fullname: this.formModel.value.Fullname,
      Password: this.formModel.value.Passwords.Password
    };


    return this.http.post(this.baseURI+'/ApplicationUser/Register', body);
  }

  
  adminRegistration(){
    var body= {
      UserName: this.formModel.value.username,
      Email: this.formModel.value.email,
      Fullname: this.formModel.value.Fullname,
      Password: this.formModel.value.Passwords.Password
    };


    return this.http.post(this.baseURI+'/ApplicationUser/AdminRegister', body);
  }

 

  login(formData){
    return this.http.post(this.baseURI+'/ApplicationUser/Login', formData);

  }

  
  uploadFile(fileToUpload:File){

    const endpoint = this.baseURI+'/files/Upload';
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    // formData.append('ImageCaption', caption);

    return this.http
    .post(endpoint, formData);

  }

  getUserProfile(){

    // var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})
    return this.http.get(this.baseURI+'/UserProfile'); // ,{headers : tokenHeader}
  }

  roleMatch(allowedRoles): boolean{
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;

    allowedRoles.forEach(element => {
      if(userRole == element){
        isMatch = true;
        return false;
      }
      
    });



    return isMatch;
  }
  // this.http.post('https://localhost:5001/api/upload', formData, {reportProgress: true, observe: 'events'})

  postMortgage(){
    return this.http.post(this.baseURI+'/PropertyMortgages',this.formData);
    //, {reportProgress: true, observe: 'events'});

  }



  
  postPaymentDetail(){

    return this.http.post(this.baseURI+'/PaymentDetails',this.formData);

  }
  
  postQuestions(){

    return this.http.post(this.BaseURI+'/MyQuestions',this.formData);

  }
  
  postAnswer(){

    return this.http.post(this.BaseURI+'/Answers',this.formData);

  }

  GetMortgagedHouses(){
    return this.http.get(this.baseURI+'/PropertyMortgages')
    .toPromise()
    .then(res => this.list = res as any[]);
  }

  getQuestions(){
    return this.http.get(this.BaseURI+'/MyQuestions')
    .toPromise()
    .then(res => this.list = res as any[]);
  }

  Questions(){
    return this.http.get(this.BaseURI+'/MyQuestions')
    .toPromise()
    .then(res => this.list = res as any[]);
  }


  // GetMortgagedHoused(id){
  //   return this.http.get(this.baseURI+'/PropertyMortgages')
  //   .toPromise()
  //   .then(res => this.list = res as any[]);
  // }



  GetMortgagedHouse(id): Observable<any>
  
  {

    let rest = this.http.get<any>(this.baseURI+`/PropertyMortgages/${id}`)
    console.log(rest)
    return rest

    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
    ;
  }

  


  GetMortgagedHous(id): Observable<any>
  
  {

    let rest = this.http.get<any>(this.BaseURI+`/MyQuestions/${id}`)
    console.log(rest)
    return rest

    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
    ;
  }

  



  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
  
}
