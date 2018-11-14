import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { TrackFeatures } from '../../data/track-features';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css']
})
export class TrackPageComponent implements OnInit {
	trackId:string;
	track:TrackData;
  audioFeatures:TrackFeatures;
  featureTypes = TrackFeatures.FeatureTypes;
  artistname:string;

  constructor(private http:HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.trackId = this.route.snapshot.paramMap.get('id');
    
    this.http.get('http://localhost:8888/track/' 
    + this.trackId + '/' ).toPromise().then(response => response)
    .then (data => {
//      console.log(data);
      this.track = new TrackData(data);
      for(let i=0; i<data["artists"].length; i++){
        //console.log(data["artists"][i]);
        //(this.topTracks).push(new TrackData((data["tracks"])[i]));
    }
      this.artistname = data["artists"][0].name;
    });

    this.http.get('http://localhost:8888/track-audio-features/' 
    + this.trackId + '/' ).toPromise().then(response => response)
    .then (data => {
//      console.log(data);

      this.audioFeatures = new TrackFeatures(data);
      //this.featureTypes = this.audioFeatures.f
      //console.log(this.audioFeatures);
    });
  	//TODO: Inject the spotifyService and use it to get the track data and it's audio features
  }

}
