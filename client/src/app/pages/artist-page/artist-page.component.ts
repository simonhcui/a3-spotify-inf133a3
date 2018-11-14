import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
  albums:AlbumData[];
  img:string;

  constructor(private http:HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.artistId = this.route.snapshot.paramMap.get('id');
    this.topTracks = []; 
    this.albums =[];
    this.relatedArtists = [];

    this.http.get('http://localhost:8888/artist/' 
    + this.artistId + '/' ).toPromise().then(response => response)
    .then (data => {
      //console.log(data);
      this.artist = new ArtistData(data);
      this.img = this.artist.imageURL;
      //console.log(this.artist.url);
  });

  this.http.get('http://localhost:8888/artist-top-tracks/' 
  + this.artistId + '/' ).toPromise().then(response => response)
  .then (data => {
//    console.log(data);
  for(let i=0; i<(data["tracks"]).length; i++){
      console.log(data["tracks"][i]);
      (this.topTracks).push(new TrackData((data["tracks"])[i]));
    }
  });

  this.http.get('http://localhost:8888/artist-albums/' 
  + this.artistId + '/' ).toPromise().then(response => response)
  .then (data => {
//    console.log(data);
    for(let i=0; i<(data["items"]).length; i++){
      console.log(data["items"][i]);
      (this.albums).push(new AlbumData((data["items"])[i]));
    }
  });

  this.http.get('http://localhost:8888/artist-related-artists/' 
  + this.artistId + '/' ).toPromise().then(response => response)
  .then (data => {
//    console.log(data);
    for(let i=0; i<(data["artists"]).length; i++){
      console.log(data["artists"][i]);
      (this.relatedArtists).push(new ArtistData((data["artists"])[i]));
    }
  });

  //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums
  }

}