import {Component, Input, OnInit} from '@angular/core';
import {VideoDto} from "../video-dto";
import {VideoService} from "../video.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-video-card',
  templateUrl: './my-video-card.component.html',
  styleUrls: ['./my-video-card.component.css']
})
export class MyVideoCardComponent implements OnInit {

  @Input()
  video!: VideoDto;
  constructor(private videoService: VideoService,private router: Router) { }

  ngOnInit(): void {
  }

  deleteVideo() {
    this.videoService.deleteVideo(this.video.id).subscribe(data => {
      this.router.navigateByUrl("/my-videos");
    })
  }

}
