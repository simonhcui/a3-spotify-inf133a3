import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
    return Promise.resolve();
  }

  myme():Promise<any> {
    this.http.get( this.expressBaseUrl +'/me').toPromise();
    return Promise.resolve();
    }
  //TODO: create functions for all of the endpoints on the webserver (except for /login, which is linked to from a button in the navbar).
}
