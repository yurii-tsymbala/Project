import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home-presentation',
  templateUrl: './home-presentation.component.html',
  styleUrls: ['./home-presentation.component.scss'],
})
export class HomePresentationComponent {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  isOpened: boolean = false;

  onPlay() {
    this.isOpened = true;
  }

  onClose() {
    this.isOpened = false;
  }

  onPause() {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
    video.paused ? video.play() : video.pause();
  }
}
