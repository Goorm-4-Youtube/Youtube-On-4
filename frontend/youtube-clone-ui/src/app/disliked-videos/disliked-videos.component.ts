import { Component, OnInit } from '@angular/core';
import {VideoDto} from "../video-dto";
import {VideoService} from "../video.service";
import {UserService} from "../user.service";

@Component({
  selector: 'app-disliked-videos',
  templateUrl: './disliked-videos.component.html',
  styleUrls: ['./disliked-videos.component.css']
})
export class DislikedVideosComponent implements OnInit {

  dislikedVideos: Array<VideoDto> = [];

  constructor(private videoService: VideoService, private userService: UserService) { }

  ngOnInit(): void {

    this.userService.getDisLikedVideo().subscribe( response => {
      this.dislikedVideos = response;
    })
  }
}
