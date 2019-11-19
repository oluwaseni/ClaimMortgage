import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styles: []
})
export class AdminRegistrationComponent implements OnInit {

  constructor(private router:Router, private service: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    if(localStorage.getItem('token') != null)
    this.router.navigateByUrl('/home');
    
  }

  onSubmit(){
    this.service.adminRegistration().subscribe(
      (res: any) =>{
        if(res.succeeded){
          this.service.formModel.reset();
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
        console.log(err);
      }
    );
  }

}
