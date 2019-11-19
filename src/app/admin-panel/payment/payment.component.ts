import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styles: []
})
export class PaymentComponent implements OnInit {

  constructor(private service: UserService, private toaster: ToastrService, private router:Router) { }

  ngOnInit() {
    this.resetForm();
  }

  formData?: any ={}



  resetForm(form? : NgForm){
    if(form != null){

    
      form.resetForm();
      this.service.formData = {
        CardId:0,
        Username:"",
        CardNumber: "",
        ExpirationDate:"",
        CVV:""
      }
      }
    }


    onSubmit(form: NgForm){
      
    this.service.postPaymentDetail().subscribe(
      res =>{
        // if(res != null && res != undefined)
        console.log(res);
        this.toaster.success("Submitted Successfully", "Payment Detail Register");
        // this.service.refreshList();
        this.resetForm(form);
        this.router.navigateByUrl('home/admin/mortgage');
      },
      err =>
      {
        console.log(err);
      }
      
    )
    }
}
