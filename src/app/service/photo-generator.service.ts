import { computed, Injectable, signal } from '@angular/core';
import { BLUR_PHOTO_URL, IMAGE_LENGTH, MEDIUM_PHOTO_URL } from "../photo-url.constants";
import { Photo } from "../photo-gallery/photo/photo.component";
import groupping from '../../../scripts/groupping.json';

function generatePhoto(i: number) {
  return {
    id: MEDIUM_PHOTO_URL(i),
    index: i,
    url: MEDIUM_PHOTO_URL(i),
    blurUrl: BLUR_PHOTO_URL(i),
  };
}

@Injectable({
  providedIn: 'root'
})
export class PhotoGeneratorService {

  readonly filters = signal([])

  get ALL_IMAGES(): Photo[] {
    const images = new Array(IMAGE_LENGTH);
    for (let i = 1; i <= IMAGE_LENGTH; i++) {
      images[i] = generatePhoto(i);
    }
    return images.filter(Boolean);
  }

  items = computed(() => {
    if (!this.filters().length) {
      return this.ALL_IMAGES;
    }
    const imageIndexes = new Set<number>(groupping[this.filters()[0]]);
    this.filters().forEach((filter)=>{
      const photos = groupping[filter];
      if (photos) {
        imageIndexes.forEach(value => {
          if(!photos.includes(value)) {
            imageIndexes.delete(value);
          }
        })
      }
    })
    return [...imageIndexes].map(index => generatePhoto(index));
  },)

  public addFilter(filter: string) {
    this.filters.set([...this.filters(), filter]);
  }

  public removeFilter(filter: string) {
    this.filters.set(this.filters().filter(item => item !== filter));
  }

  public toggleFilter(filter: string) {
    if (this.filters().includes(filter)) {
      this.removeFilter(filter);
    } else {
      this.addFilter(filter);
    }
  }
}
