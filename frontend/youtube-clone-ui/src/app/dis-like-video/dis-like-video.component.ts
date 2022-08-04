import { Component, OnInit } from '@angular/core';
import {VideoDto} from "../video-dto";
import {UserService} from "../user.service";
import {VideoService} from "../video.service";

@Component({
  selector: 'app-dis-like-video',
  templateUrl: './dis-like-video.component.html',
  styleUrls: ['./dis-like-video.component.css']
})
export class DisLikeVideoComponent implements OnInit {
  dislikedVideos: Array<VideoDto> = [];
  constructor(private videoService: VideoService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.getDisLikedVideo().subscribe(response =>{
      this.dislikedVideos = response;
    })
  }

}
