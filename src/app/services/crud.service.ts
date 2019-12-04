import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  private urlGlobal:string ="https://reqres.in/api/" 

  constructor(private http:HttpClient) { }

  

  public loginUser(body){

    let url = `${this.urlGlobal}login`

    return this.http.post(url,body)
  }

  public registerUser(body){

    let url = `${this.urlGlobal}register`

    return this.http.post(url,body)

  }

  public ShowFriends(){
    console.log('algo');
    

    let url = `${this.urlGlobal}users?per_page=12`

    return this.http.get(url)
  }

  public newFriend(body){

    let url = `${this.urlGlobal}users`;

    return this.http.post(url,body)
  }


  public updateFriend(body, id){

    let url = `${this.urlGlobal}users/${id}`;

    return this.http.put(url,body)
  }


  public deleteFriend(){

    let url = `${this.urlGlobal}users/2`;

    return this.http.delete(url)
  }

  public Newsapi(){
    let url =`https://newsapi.org/v2/top-headlines?country=mx&apiKey=2590b24851834b78a064cf360b02a734`

    return this.http.get(url)
  }
}
