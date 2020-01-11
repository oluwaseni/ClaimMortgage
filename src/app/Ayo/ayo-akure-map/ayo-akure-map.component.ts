import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ayo-akure-map',
  templateUrl: './ayo-akure-map.component.html',
  styleUrls: ['./ayo-akure-map.component.css']
})
export class AyoAkureMapComponent implements OnInit {

  constructor() { }

  aObj:any;

  ngOnInit() { this.setActive()
  }

   setActive() {
    this.aObj = document.getElementById('navi').getElementsByTagName('a');
    for(let i=0;i<this.aObj.length;i++) { 
    if(document.location.href.indexOf(this.aObj[i].href)>=0) {
      this.aObj[i].className='active';
    }
    }
  }

}
