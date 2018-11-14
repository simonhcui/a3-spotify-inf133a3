import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpotifyService }  from '../../services/spotify.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  name:string = null;
  profile_pic:string = "../../../assets/unknown.jpg";
  profile_link:string = null;

  //TODO: inject the Spotify service
//  constructor() { }
constructor(private http:HttpClient, private spotify:SpotifyService) { }

  ngOnInit() {
  //	this.http.get('http://inf133-fa18.depstein.net').toPromise().then(response => {
 // 	console.log(response);
 // 	});
  }

    myabout()
    {
        alert("You pressed the button!");
    }

    

    myLoad()
    {
      //console.log("testppp");
      this.http.get('http://localhost:8888/me').toPromise().then(response => response)
      .then (data => {
      //console.log(data);
      //console.log(data["display_name"]);
      //console.log((data["images"])[0]["url"]);
      this.profile_pic = (data["images"])[0]["url"];
      this.name = data["display_name"];
//      console.log((data["external_urls"])["spotify"]);
      this.profile_link = (data["external_urls"])["spotify"];
      
      //$( "#openProf" ).click(function() {
    });


/*      
  this.http.get('http://localhost:8888/me').toPromise()
  .then(response => response).then(data => 
    {//console.log(data);
      console.log("===================");
      console.log(data["display_name"]);
      console.log("===================");
    });
*/
//      console.log(this.spotify.myme());
//      var t = this.spotify.myme();
      
 //     });
    }

//      document.getElementById("openProf").
//          addEventListener("click", function (evt) 
//          { return myabout(); });
    
  /*TODO: create a function which gets the "about me" information from Spotify when the button in the view is clicked.
  In that function, update the name, profile_pic, and profile_link fields */

}
