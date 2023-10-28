import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { CdkVirtualScrollableElement } from "@angular/cdk/scrolling";
import { PreviewComponent } from './preview/preview.component';
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    PhotoGalleryComponent,
    CdkVirtualScrollableElement,
    PreviewComponent,
    ToolbarComponent,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
