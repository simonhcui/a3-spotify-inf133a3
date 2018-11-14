import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.css']
})
export class AlbumPageComponent implements OnInit {
	albumId:string;
	album:AlbumData;
  tracks1:TrackData[];
  t1:TrackData;
  tracksids:string[];
  artists:string[];
  artist:ArtistData;
  artistname:string;
  duration_ms:number;
  hideArtist:boolean = true;
  hideAlbum:boolean = true;

  constructor(private http:HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.albumId = this.route.snapshot.paramMap.get('id');
    this.artists = [];
    this.tracks1 = [];
    this.tracksids = [];

//    console.log("very");
    this.http.get('http://localhost:8888/album/' 
    + this.albumId + '/' ).toPromise().then(response => response)
    .then (data => {
      console.log(data);
      this.album = new AlbumData(data);
      for(let i=0; i<data["artists"].length; i++){
        //console.log(data["artists"][i]);
        this.artists.push(data["artists"][i].name);
        //(this.topTracks).push(new TrackData((data["tracks"])[i]));
    }
      //(this.tracks1).push(new TrackData((data["tracks"]["items"])[0]));
      this.t1 = new TrackData((data["tracks"]["items"])[0]);
console.log(this.t1.id);
console.log(this.t1.name);
this.duration_ms = this.t1.duration_ms;
console.log(this.t1.duration_ms);
console.log(this.durationStr());
console.log((data["tracks"]["items"])[0]["track_number"]);
console.log((data["tracks"]["items"])[1]["track_number"]);
//(this.tracks1).push(this.t1);

      for(let i=0; i<(data["tracks"])["items"].length; i++){
        //console.log((data["tracks"])["items"][i]["external_urls"]);
//        console.log(((data["tracks"])["items"][i])["id"]);
        (this.tracksids).push(((data["tracks"])["items"][i])["id"])
//        this.tracks.push((data["tracks"])["items"][i]);
      }

      for(let i=0; i<(data["tracks"])["items"].length; i++){
        //console.log("test");
        //console.log((data["tracks"])["items"][i]);
        (this.tracks1).push(new TrackData((data["tracks"])["items"][i]));
      }


      this.artistname = data["artists"][0].name;
      //this.artisturl = ((data["artists"][0])["uri"]);
      //console.log(this.artisturl);
      });

      //this.http.get('http://localhost:8888/tracks/' 
      //+ this.tracksids[0] + '/' ).toPromise().then(response => response)
      //.then (data => {
      //  console.log(data);
      //});

      this.http.get('http://localhost:8888/album-tracks/' 
      + this.albumId + '/' ).toPromise().then(response => response)
      .then (data => {
        //console.log(data);
        for(let i=0; i<(data["items"]).length; i++){
          //console.log(data["items"][i]);
          //(this.tracks).push(new TrackData((data["items"])[i]));
         // (this.tracks1).push(new TrackData((data["items"])[i]));
        }
        //console.log(data["items"][0]);
        //this.t1 = new TrackData(data["items"][0]);
        //this.t1 = new TrackData(data["items"][1]);
        //(this.tracks).push(this.t1);
        //console.log("uuu");
        //console.log(this.t1);
    
      });
        //TODO: inject spotifyService and use it to get the album data and the tracks for the album
  }

  durationStr() {
		var minutes:number = this.duration_ms / 60000; //60 sec/min * 100ms/sec
		var seconds:number = (this.duration_ms) / 1000 % 60; // 100ms/sec, get remainder
		return minutes.toFixed(0) + ':' + seconds.toFixed(0).padStart(2, '0');
  }
}
