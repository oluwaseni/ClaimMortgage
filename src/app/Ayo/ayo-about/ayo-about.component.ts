import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ayo-about',
  templateUrl: './ayo-about.component.html',
  styleUrls: ['./ayo-about.component.css']
})
export class AyoAboutComponent implements OnInit {

  constructor() { }

  aObj:any

  ngOnInit() {

    this.setActive()
  }

   setActive() {
    this.aObj = document.getElementById('navi').getElementsByTagName('a');
    for(let i=0;i<this.aObj.length;i++) { 
    if(document.location.href.indexOf(this.aObj[i].href)>=0) {
      this.aObj[i].className='active';
    }
    }
  }
  // window.onload = setActive;

}
