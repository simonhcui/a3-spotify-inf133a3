import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SpotifyService ]
})
export class SearchComponent implements OnInit {
  searchString:string;
  searchCategory:string = 'artist';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[];
  artistflag;
  albumflag;
  trackflag;

  constructor(private http:HttpClient, private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  search() {
    var tid;
    this.resources = [];
    this.artistflag = false;
    this.trackflag = false;
    this.albumflag = false;

/*
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
*/    

/*
Route path: /users/:userId/:bookId
Request URL: http://localhost:3000/users/34/8989
req.params: { "userId": "34", "bookId": "8989" }
*/    

/*
Route path: /plantae/:genus.:species
Request URL: http://localhost:3000/plantae/Prunus.persica
req.params: { "genus": "Prunus", "species": "persica" }
*/

//    this.http.get('http://localhost:8888/search/artist/tania bowra/'.replace(/ /g,"%20")).toPromise().then(response => response)
//    this.http.get('http://localhost:8888/search/artist/tania bowra/').toPromise().then(response => response)
//    this.http.get('http://localhost:8888/search/artist/carly Rae Jepsen/').toPromise().then(response => response)
    this.http.get('http://localhost:8888/search/' 
      + this.searchCategory + '/' + this.searchString + 
      '/').toPromise().then(response => response)
    .then (data => {
    console.log(data);
    if (this.searchCategory == "artist")
    {
      for(let i=0; i<((data["artists"])["items"]).length; i++){
        (this.resources).push(new ArtistData(((data["artists"])["items"])[i]));
      }
      this.artistflag = true;
      this.albumflag = false;
      this.trackflag = false;

    }
    if (this.searchCategory == "album")
    {
      for(let i=0; i<((data["albums"])["items"]).length; i++){
        (this.resources).push(new AlbumData(((data["albums"])["items"])[i]));
      }
//      alert("album");
//      console.log(this.resources);
      this.artistflag = false;
      this.albumflag = true;
      this.trackflag = false;
    }
    if (this.searchCategory == "track")
    {
      for(let i=0; i<((data["tracks"])["items"]).length; i++){
        (this.resources).push(new TrackData(((data["tracks"])["items"])[i]));
      }
      this.artistflag = false;
      this.albumflag = false;
      this.trackflag = true;
    }


  });

 
    //TODO: call search function in spotifyService and parse response
  }

}
