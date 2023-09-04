import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { PhotoComponent } from './photo-gallery/photo/photo.component';
import { CdkVirtualScrollableElement } from "@angular/cdk/scrolling";
import { PreviewComponent } from './preview/preview.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    PhotoGalleryComponent,
    CdkVirtualScrollableElement,
    PreviewComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
