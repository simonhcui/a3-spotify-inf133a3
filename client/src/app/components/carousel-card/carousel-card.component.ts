import { Component, OnInit, Input } from '@angular/core';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.css']
})
export class CarouselCardComponent implements OnInit {
  @Input() resource:ResourceData;

  constructor() { }

  ngOnInit() {
  }

  testtt(){
    alert("ppp");
    console.log(this.resource.id);
    console.log(this.resource.name);
    console.log(this.resource);
//    console.log("oooo");
  }
}
