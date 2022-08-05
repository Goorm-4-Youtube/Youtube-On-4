import { Component, OnInit } from '@angular/core';
import {VideoDto} from "../video-dto";
import {VideoService} from "../video.service";
import {UserService} from "../user.service";

@Component({
  selector: 'app-liked-videos',
  templateUrl: './liked-videos.component.html',
  styleUrls: ['./liked-videos.component.css']
})
export class LikedVideosComponent implements OnInit {

  likedVideos: Array<VideoDto> = [];

  constructor(private videoService: VideoService, private userService: UserService) { }

  ngOnInit(): void {

    this.userService.getLikedVideo().subscribe( response => {
      this.likedVideos = response;
    })
  }

}
