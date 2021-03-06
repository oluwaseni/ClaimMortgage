import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  formModel = {
    UserName:'',
    Password:'',

  }
  
  
  constructor(private service:UserService, private router : Router, private toaster: ToastrService) { }



  ngOnInit() {

    if(localStorage.getItem('token') != null)
    this.router.navigateByUrl('/home');
  }

  onSubmit(form:NgForm){
    this.service.login(form.value).subscribe(
      (res: any)=>{
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/home');

      },
      err =>{
        if(err.status == 400){
          this.toaster.error('Incorrect Username or Password.', 'Authentication Failed.');
        }
        else if(err.status == 500){
          this.toaster.error('Can not connect to the server with input data!!!')
        }
        else{
          console.log(err);
        }
      }
    );

  }

}
