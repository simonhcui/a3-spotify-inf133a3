import { Component, OnInit, Input } from '@angular/core';
import { ResourceData } from '../../data/resource-data';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
	@Input() carouselId:string;
	@Input() resources:ResourceData[];

  constructor() { }

  ngOnInit() {
  }

  testtt1(){
    alert("ppp");
    console.log( this.resources.length);
    for (var i = 0; i < this.resources.length; i++) {
      console.log((this.resources[i]).name); // 0,1,2
  }
    console.log("ooooaaaa");
  }

}
