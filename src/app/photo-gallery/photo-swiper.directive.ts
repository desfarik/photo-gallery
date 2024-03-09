import { AfterViewInit, computed, Directive, HostListener, inject, Input, OnDestroy } from '@angular/core';
import { Photo } from "./photo/photo.component";
import { FULLSCREEN_EXIT_ICON, FULLSCREEN_IN_ICON } from "./icons";
import type PhotoSwipeLightbox from "photoswipe";
import { PhotoGeneratorService } from "../service/photo-generator.service";
import { SCREEN_SIZES } from "../tokens/screen.sizes";

@Directive({
  selector: '[photoSwiper]',
  standalone: true,
})
export class PhotoSwiperDirective implements AfterViewInit, OnDestroy {

  @Input()
  photo!: Photo;
  lightbox!: PhotoSwipeLightbox;
  cachedDataSource;
  photoGeneratorService = inject(PhotoGeneratorService);
  screenSizes = inject(SCREEN_SIZES);

  galleryDataSource = computed(() => {
    return this.photoGeneratorService.items().map(item => {
      return {
        src: item.url,
        width: this.screenSizes.width(),
        height: this.screenSizes.height(),
      }
    })
  });

  @HostListener('window:resize')
  onResize() {
    if (!this.lightbox) {
      return;
    }
    this.resizePhotoSwiperImages();
    this.lightbox.currSlide.updateContentSize(true);
  }

  @HostListener('document:fullscreenchange')
  onFullscreenChange() {
    const button = document.querySelector('.pswp__button--fullscreen-button');
    if (button) {
      button.innerHTML = this.inFullScreen ? FULLSCREEN_EXIT_ICON : FULLSCREEN_IN_ICON;
    }
  }

  ngOnDestroy(): void {
    this.lightbox?.destroy();
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

  get inFullScreen(): boolean {
    return document.fullscreenElement === document.body;
  }

  @HostListener('click')
  async openGallery() {
    const PhotoSwipeLightbox = await this.loadPhotoSwipe();
    this.cachedDataSource = this.galleryDataSource().slice(1);
    if (this.lightbox) {
      this.lightbox.destroy();
    }
    this.lightbox = new PhotoSwipeLightbox({
      dataSource: this.cachedDataSource,
      index: this.photo.index - 1,
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
        onClick: () => {
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
}
