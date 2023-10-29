import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { NgForOf } from "@angular/common";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { chunk } from "lodash-es";
import { Photo, PhotoComponent } from "./photo/photo.component";
import { BLUR_PHOTO_URL, IMAGE_LENGTH, MEDIUM_PHOTO_URL } from "../photo-url.constants";
import PhotoSwipeLightbox from "photoswipe";

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
    ScrollingModule,
    PhotoComponent,
  ]
})
export class PhotoGalleryComponent implements AfterViewInit{
  imageRows: PhotoLine[];
  imageWidth!: number;
  lightbox!: PhotoSwipeLightbox;

  constructor(private changeDetector: ChangeDetectorRef) {
    this.imageRows = this.generateImages()
    window.addEventListener('resize', () => {
      this.imageRows = this.generateImages();
      this.changeDetector.detectChanges();
    })
  }

  ngAfterViewInit(): void {
    this.loadPhotoSwipe();
  }

  trackById = (index: number, item: any) => {
    return item.id;
  }

  get imageHeight(): number {
    return this.imageWidth * 1.5;
  }


  async openGallery(photo: Photo) {
    const PhotoSwipeLightbox = await this.loadPhotoSwipe();
    this.lightbox = new PhotoSwipeLightbox({
      dataSource: this.galleryDataSource,
      index: photo.index
    });
    this.lightbox.init();
  }


  private async loadPhotoSwipe() {
    return (await import('photoswipe')).default;
  }

  private generateImages(): PhotoLine[] {
    this.imageWidth = this.availableWidth / this.imagePerLineSize;
    const images = new Array(IMAGE_LENGTH);
    for (let i = 1; i <= IMAGE_LENGTH; i++) {
      images[i] = {
        id: MEDIUM_PHOTO_URL(i),
        index: i - 1,
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

  get galleryDataSource() {
    const images = new Array(IMAGE_LENGTH);
    for (let i = 0; i < IMAGE_LENGTH; i++) {
      images[i] = {
        src: MEDIUM_PHOTO_URL(i + 1),
        width: '100%'
      };
    }
    return images;
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
