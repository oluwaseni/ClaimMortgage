import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-mortgage',
  templateUrl: './mortgage.component.html',
  styles: []
})
export class MortgageComponent implements OnInit {

  constructor(private service:UserService, private router:Router, private toastr: ToastrService, private http:HttpClient) { }

  // fileUrl : string = "assets/Files/default-image.png";
  // fileToUpload = null;
  formModelProperty?: any ={}
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
 
  // constructor(private http: HttpClient) { }
 
  ngOnInit() {
  }


  onSubmit(){
    this.service.postMortgages().subscribe(
      (res: any) =>{
        if(res.succeeded){
          this.service.formModelProperty.reset();
          this.toastr.success('New user Created', 'Registration Successful')
        }
        else{
          res.errors.forEach(element =>{
            switch(element.code){
              case 'DuplicateUsername':
                //Username is already taken
                this.toastr.error('Username already taken', 'Registration Failed');
                break;

              default:
                //Registration has failed
                this.toastr.error(element.description, 'Registration Failed');
                break;
            }
          });;
          
        }
      },
      err =>{
        this.toastr.error(err, 'Failed to register Property');
        console.log(err);
      }
    );
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
    
  
    onSubmi(form: NgForm){
      
      this.service.postMortgages().subscribe(
        res =>{
          // if(res != null && res != undefined)
          console.log(res);
          this.toastr.success("Submitted Successfully", "Payment Detail Register");
          // this.service.refreshList();
          this.resetForm(form);
        },
        err =>
        {
          console.log(err);
        }
        
      )
      }
 

    onSubmits(form: NgForm){
      
    this.service.postMortgages().subscribe(
      res =>{
        // if(res != null && res != undefined)
        console.log(res);
        this.toastr.success("Submitted Successfully", "Payment Detail Register");
        // this.service.refreshList();
        this.resetForm(form);
      },
      err =>
      {
        console.log(err);
      }
      
    )
    }
}
