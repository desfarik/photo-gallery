import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";

export interface Photo {
  id?: string;
  url: string;
  blurUrl: string;
}

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf
  ]
})
export class PhotoComponent implements OnDestroy {
  @Input()
  photo!: Photo;
  isBlurLoaded = false;
  isBlurFailed = false;
  isLoaded = false;

  @ViewChild('blurImg') blurImg!: ElementRef<HTMLImageElement>
  @ViewChild('img') img?: ElementRef<HTMLImageElement>

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    this.blurImg.nativeElement.src = '';
    if(this.img) {
      this.img.nativeElement.src = '';

    }
  }

  setBlurLoaded() {
    this.isBlurLoaded = true;
    this.changeDetector.detectChanges();
  }

  setBlurFailed() {
    this.isBlurLoaded = true;
    this.isBlurFailed = true;
    this.changeDetector.detectChanges();
  }

  setLoaded() {
    this.isLoaded = true;
    this.changeDetector.detectChanges();
  }
}
