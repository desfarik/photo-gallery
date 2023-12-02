import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { NgForOf } from "@angular/common";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { chunk } from "lodash-es";
import { Photo, PhotoComponent } from "./photo/photo.component";
import { BLUR_PHOTO_URL, IMAGE_LENGTH, MEDIUM_PHOTO_URL } from "../photo-url.constants";
import type PhotoSwipeLightbox from "photoswipe";
import { FULLSCREEN_EXIT_ICON, FULLSCREEN_IN_ICON } from "./icons";

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
export class PhotoGalleryComponent implements AfterViewInit {
  imageRows: PhotoLine[];
  imageWidth!: number;
  lightbox!: PhotoSwipeLightbox;
  cachedDataSource;

  constructor(private changeDetector: ChangeDetectorRef) {
    this.imageRows = this.generateImages()
    window.addEventListener('resize', () => {
      this.imageRows = this.generateImages();
      this.resizePhotoSwiperImages();
      this.lightbox.currSlide.updateContentSize(true);
      this.changeDetector.detectChanges();
    })
    document.addEventListener('fullscreenchange', (event) => {
      const button = document.querySelector('.pswp__button--fullscreen-button');
      if (button) {
        button.innerHTML = this.inFullScreen ? FULLSCREEN_EXIT_ICON : FULLSCREEN_IN_ICON;
      }
    });
  }

  private resizePhotoSwiperImages() {
    this.cachedDataSource.forEach(image => {
      image.width = window.innerWidth;
      image.height = window.innerHeight;
    })
    this.lightbox.contentLoader._cachedItems.forEach(image => {
      image.width = window.innerWidth;
      image.height = window.innerHeight;
      if (image.slide) {
        image.slide.height = window.innerHeight;
        image.slide.width = window.innerWidth;
      }
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

  get inFullScreen(): boolean {
    return document.fullscreenElement === document.body;
  }

  async openGallery(photo: Photo) {
    const PhotoSwipeLightbox = await this.loadPhotoSwipe();
    this.cachedDataSource = this.galleryDataSource;
    this.lightbox = new PhotoSwipeLightbox({
      dataSource: this.cachedDataSource,
      index: photo.index,
      initialZoomLevel: 'fit',
      secondaryZoomLevel: 2,
      maxZoomLevel: 1,
    });
    this.addFullscreenButton();
    this.lightbox.init();
    this.lightbox.on('close', () => {
      if (this.inFullScreen) {
        document.exitFullscreen();
      }
    });
    console.log(this.lightbox);

  }

  private addFullscreenButton() {
    if (!document.fullscreenEnabled) {
      return
    }
    this.lightbox.on('uiRegister', () => {
      this.lightbox.ui.registerElement({
        name: 'fullscreen-button',
        ariaLabel: 'Fullscreen zoom',
        order: 9,
        isButton: true,
        html: this.inFullScreen ? FULLSCREEN_EXIT_ICON : FULLSCREEN_IN_ICON,
        onClick: (event, el) => {
          if (this.inFullScreen) {
            document.exitFullscreen();
          } else {
            document.body.requestFullscreen({ navigationUI: "hide" });
          }
        }
      });
    });
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
        width: window.innerWidth,
        height: window.innerHeight,
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
