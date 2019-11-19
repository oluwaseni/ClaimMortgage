import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: []
})
export class RegistrationComponent implements OnInit {


  // element: any={}

  // formModel?: any ={}
  constructor(public service:UserService, private toastr: ToastrService, private router: Router) { }

  formModel?: any ={}

  ngOnInit() {

    
    if(localStorage.getItem('token') != null)
    this.router.navigateByUrl('/home');
    
  }


  onSubmit(){
    this.service.registration().subscribe(
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
