import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styles: []
})
export class PropertiesComponent implements OnInit {

  constructor(private service: UserService, private router:Router) { }

  ngOnInit() {
    this.service.GetMortgagedHouses();
  }

  getProperty(id){
    
    this.router.navigate(['/home/properties/'+ id]);
    
  }

}
