import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { NgForOf, NgOptimizedImage } from "@angular/common";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { chunk } from "lodash-es";
import { Photo, PhotoComponent } from "./photo/photo.component";
import { BLUR_PHOTO_URL, IMAGE_LENGTH, MEDIUM_PHOTO_URL } from "../photo-url.constants";

interface PhotoLine {
  id: string,
  images: Photo[],
}


@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgForOf,
    NgOptimizedImage,
    ScrollingModule,
    PhotoComponent
  ]
})
export class PhotoGalleryComponent {
  imageRows: PhotoLine[];
  imageWidth!: number;

  constructor(private changeDetector: ChangeDetectorRef) {
    this.imageRows = this.generateImages()
    window.addEventListener('resize', () => {
      this.imageRows = this.generateImages();
      this.changeDetector.detectChanges();
    })
  }

  trackById = (index: number, item: any) => {
    return item.id;
  }

  get imageHeight(): number {
    return this.imageWidth * 1.5;
  }


  private generateImages(): PhotoLine[] {
    this.imageWidth = this.availableWidth / this.imagePerLineSize;
    const images = new Array(IMAGE_LENGTH);
    for (let i = 1; i <= IMAGE_LENGTH; i++) {
      images[i] = {
        id: MEDIUM_PHOTO_URL(i),
        url: MEDIUM_PHOTO_URL(i),
        blurUrl: BLUR_PHOTO_URL(i),
      };
    }
    return chunk(images.slice(1), this.imagePerLineSize).map(images => {
      return {
        images,
        id: images.map(image => image.id).join('-'),
      }
    });
  }

  private get availableWidth(): number {
    return window.innerWidth;
  }

  get imagePerLineSize(): number {
    const width = this.availableWidth;
    if (width < 800) {
      return 2;
    }
    if (width < 1200) {
      return 3;
    }
    return 4;
  }
}
