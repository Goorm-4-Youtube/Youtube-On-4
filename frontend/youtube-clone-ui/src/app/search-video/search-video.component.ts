import { Component, OnInit } from '@angular/core';
import {VideoDto} from "../video-dto";
import {VideoService} from "../video.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search-video',
  templateUrl: './search-video.component.html',
  styleUrls: ['./search-video.component.css']
})
export class SearchVideoComponent implements OnInit {

  searchedVideos : Array<VideoDto> = [];
  query: string= "";

  constructor(private videoService: VideoService,private activatedRoute: ActivatedRoute) {
    this.query = this.activatedRoute.snapshot.params['query']
  }

  ngOnInit(): void {
    console.log("query is"+this.query);
    console.log(this.query);
    this.videoService.searchVideos(this.query).subscribe(response => {
      this.searchedVideos= response;
      console.log(this.searchedVideos);
    });
  }

}
