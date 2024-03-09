import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgForOf } from "@angular/common";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { Photo, PhotoComponent } from "./photo/photo.component";
import { PhotoGeneratorService } from "../service/photo-generator.service";
import { SCREEN_SIZES } from "../tokens/screen.sizes";
import { PhotoSwiperDirective } from "./photo-swiper.directive";
import { chunk } from "../utils/chunk";

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
    PhotoSwiperDirective,
  ]
})
export class PhotoGalleryComponent {

  photoGeneratorService = inject(PhotoGeneratorService);
  screenSizes = inject(SCREEN_SIZES);

  imageRows = computed<PhotoLine[]>(() => {
    return chunk(this.photoGeneratorService.items(), this.imagePerLineSize()).map(images => {
      return {
        images: images,
        id: images.map(image => image.id).join('-'),
      }
    });
  });

  imagePerLineSize = computed(() => {
    const width = this.screenSizes.width();
    if (width < 800) {
      return 2;
    }
    if (width < 1200) {
      return 3;
    }
    return 4;
  });

  imageWidth = computed(() => {
    return this.screenSizes.width() / this.imagePerLineSize();
  })

  imageHeight = computed(() => {
    return this.imageWidth() * 1.5;
  })
  trackById = (index: number, item: any) => {
    return item.id;
  }
}
