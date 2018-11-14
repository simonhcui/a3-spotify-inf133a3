import { Component, OnInit, Input } from '@angular/core';
import { TrackData } from '../../data/track-data';
import { TrackFeatures } from '../../data/track-features';

@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css']
})
export class ThermometerComponent implements OnInit {
  @Input() featureType;
  mypercent:number;
  smypercent:string;
  mycolor:string;
  @Input() audioFeatures:TrackFeatures;

  //TODO: define Input fields and bind them to the template.

  constructor() { }

  ngOnInit() {

//    console.log(this.audioFeatures);
//    console.log(this.featureType);
    //console.log(this.audioFeatures["featureToPercent"]);
    //console.log(Object.keys(this.audioFeatures["featureToPercent"]));
//    console.log((this.audioFeatures["featureToPercent"])[this.featureType]);
//    this.mypercent = (this.audioFeatures["featureToPercent"])[this.featureType];
    //this.mycolor = (this.audioFeatures["featureToPercent"])[this.featureType];
//    console.log(this.mypercent);
//    this.mypercent = Math.floor(this.mypercent * 100);
//    this.smypercent = this.mypercent.toString() + '%';
    console.log(this.audioFeatures.color(this.featureType));
    console.log(this.audioFeatures.percent(this.featureType));
    this.mycolor =this.audioFeatures.color(this.featureType);
    this.smypercent =this.audioFeatures.percent(this.featureType);
//      for(let i=0; i<(Object.keys(this.audioFeatures["featureToPercent"])).length; i++){
//        if ( this.featureType == (Object.keys(this.audioFeatures["featureToPercent"]))[i])
//        {
//          console.log((this.audioFeatures["featureToPercent"])[this.featureType]);
//        }
//      }
    //console.log((this.audioFeatures["featureToPercent"])["danceability"]);
    //  for(let i=0; i<(this.audioFeatures["featureToPercent"]).length; i++){
    //  (this.resources).push(new TrackData(((data["tracks"])["items"])[i]));
//    }

  }

}
