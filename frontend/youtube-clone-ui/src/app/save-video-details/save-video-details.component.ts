import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ActivatedRoute} from "@angular/router";
import {VideoService} from "../video.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BehaviorSubject, Subscription} from "rxjs";
import {VideoDto} from "../video-dto";
import {UserService} from "../user.service";

@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css']
})
export class SaveVideoDetailsComponent {

  saveVideoDetailsForm: FormGroup;
  title: FormControl = new FormControl('');
  description: FormControl = new FormControl('');
  videoStatus: FormControl = new FormControl('');
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  selectedFile!: File;
  selectedFileName = '';
  videoId= '';
  fileSelected = false;
  fileUploaded!: boolean;
  videoUrl!: string;
  thumbnailUrl!: string;
  uploadThumbnailSubscription!: Subscription;
  thumbnailUploaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService,
              private matSnackBar: MatSnackBar, private userService : UserService) {
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideo(this.videoId).subscribe(data => {
      this.videoUrl = data.videoUrl;
      this.thumbnailUrl = data.thumbnailUrl;
      this.title.setValue(data.title);
      this.description.setValue(data.description);
      this.videoStatus.setValue(data.videoStatus);
      for(var i in data.tags)
      {
        this.tags.push(data.tags[i]);
      }

    })
    this.saveVideoDetailsForm = new FormGroup({
      title: this.title,
      description: this.description,
      videoStatus: this.videoStatus,
    })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(value: string): void {
    const index = this.tags.indexOf(value);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onFileSelected($event: Event) {
    // @ts-ignore
    this.selectedFile = $event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
    this.fileSelected = true;
  }

  onUpload() {
    this.uploadThumbnailSubscription = this.videoService.uploadThumbnail(this.selectedFile, this.videoId)
      .subscribe(data => {
        this.thumbnailUploaded.subscribe(() => {
          this.matSnackBar.open("Thumbnail Uploaded Successfully", "OK");
          this.fileUploaded = true;
        });
      });
  }

  saveVideo() {
    // Call the video service to make a http call to our backend
    const videoMetaData: VideoDto = {
      "id": this.videoId,
      "title": this.saveVideoDetailsForm.get('title')?.value,
      "userId": this.userService.getUserId(),
      "description": this.saveVideoDetailsForm.get('description')?.value,
      "tags": this.tags,
      "videoUrl": this.videoUrl,
      "videoStatus": this.saveVideoDetailsForm.get('videoStatus')?.value,
      "thumbnailUrl": this.thumbnailUrl,
      "likeCount": 0,
      "dislikeCount": 0,
      "viewCount": 0,

    }
    console.log("user id is");
    console.log(this.userService.getUserId());
    this.videoService.saveVideo(videoMetaData).subscribe(data => {
      console.log(data);
      this.matSnackBar.open("Video Metadata Updated successfully", "OK");
    })
  }
}
