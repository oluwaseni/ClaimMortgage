import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styles: []
})
export class UserRegistrationComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  landRegistry(){
    this.router.navigateByUrl('user/regisration/user-registration');
  }

  bankRep(){
    this.router.navigateByUrl('user/regisration/admin-registration');
  }

}
