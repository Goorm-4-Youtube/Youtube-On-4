import { Component, OnInit } from '@angular/core';
import {VideoDto} from "../video-dto";
import {VideoService} from "../video.service";
import {UserService} from "../user.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  viewedVideos: Array<VideoDto> = [];

  constructor(private videoService: VideoService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getHistory().subscribe(response => {
      this.viewedVideos = response;
    })

  }

}
