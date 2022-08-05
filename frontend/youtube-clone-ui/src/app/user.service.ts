import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {VideoDto} from "./video-dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userId: string = '';

  constructor(private httpClient: HttpClient) { }

  subscribeToUser(userId: String): Observable<boolean>{
    return this.httpClient.post<boolean>("http://localhost:8080/api/user/subscribe/"+userId,null);
  }

  unSubscribeToUser(userId: String): Observable<boolean>{
    return this.httpClient.post<boolean>("http://localhost:8080/api/user/unSubscribe/"+userId,null);
  }


  registerUser() {
     this.httpClient.get("http://localhost:8080/api/user/register",{responseType: "text"})
       .subscribe(data=>{
         this.userId = data;
       });
  }


  getUserId(): string {
    return this.userId;
  }

  getHistory(): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>("http://localhost:8080/api/user/history")
  }

  getLikedVideo(): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>("http://localhost:8080/api/user/likedVideo")
  }

  getDisLikedVideo(): Observable<Array<VideoDto>>{
    return this.httpClient.get<Array<VideoDto>>("http://localhost:8080/api/user/dislikedVideo")
  }

}
