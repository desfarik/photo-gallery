import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, signal, ViewChild } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";

export interface Photo {
  id?: string;
  index?: number;
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
  isBlurLoaded = signal(false);
  isOriginalLoaded = signal(false);
  isBlurFailed = signal(false);
  isLoaded = signal(false);

  @ViewChild('blurImg') blurImg!: ElementRef<HTMLImageElement>
  @ViewChild('img') img?: ElementRef<HTMLImageElement>

  ngOnDestroy(): void {
    if(this.blurImg) {
      this.blurImg.nativeElement.src = '';
    }
    if(this.img) {
      this.img.nativeElement.src = '';
    }
  }

  setBlurLoaded() {
    this.isBlurLoaded.set(true);
  }

  setBlurFailed() {
    this.isBlurLoaded.set(true);
    this.isBlurFailed.set(true);
  }

  setLoaded() {
    this.isLoaded.set(true);
  }
}
