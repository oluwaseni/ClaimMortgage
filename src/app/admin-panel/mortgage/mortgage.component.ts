import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { NgForm, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-mortgage',
  templateUrl: './mortgage.component.html',
  styles: []
})
export class MortgageComponent implements OnInit {

  constructor(private service:UserService, private router:Router, private toastr: ToastrService, private http:HttpClient
    , private fb:FormBuilder,) { }

  // fileUrl : string = "assets/Files/default-image.png";
  // fileToUpload = null;
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
 
  // constructor(private http: HttpClient) { }
 
  ngOnInit() {
  }

  
  formModelProperty = this.fb.group({
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



  onSubmit(){

    var body= {
      LandOwnerName: this.formModelProperty.value.LandOwnerName,
      PropertyType: this.formModelProperty.value.PropertyType,
      PercentageMortgaged: this.formModelProperty.value.PercentageMortgaged,
      BankMortgaging: this.formModelProperty.value.BankMortgaging,
      NatureOfDeeds: this.formModelProperty.value.NatureOfDeeds,
      Registered: this.formModelProperty.value.Registered,
      Volume: this.formModelProperty.value.Volume,
      Number: this.formModelProperty.value.Number,
      Page: this.formModelProperty.value.Page,
      PlanNumber: this.formModelProperty.value.PlanNumber,
      ReceiptNumber: this.formModelProperty.value.ReceiptNumber,
      FileReference: this.formModelProperty.value.FileReference,
      SerialNumber: this.formModelProperty.value.SerialNumber
    }
    console.log(body)
    this.service.postMortgages(body).subscribe(
      res =>{
        this.toastr.success("Mortgage Success", "Property");
        // document.getElementById("spin").style.display= "none";
        console.log(res)
        // location.reload(true);
    
      },
      err =>
      {
        console.log(err);
      }
      
    )
  }

 
  formData?: any ={}



  resetForm(form? : NgForm){
    if(form != null){

    
      form.resetForm();
      this.service.formData = {
        landOwnerName:"",
        propertyType:"",
        percentageMortgaged:"",
        bankMortgaging:"",
        natureOfDeeds:"",
        registered: "",
        volume: "",
        number: "",
        page: "",
        planNumber: "",
        receiptNumber: "",
        fileReference: "",
        serialNumber: ""
      }
      }
    }
    
  
  
}
