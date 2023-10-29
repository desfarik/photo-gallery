import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { CdkVirtualScrollableElement } from "@angular/cdk/scrolling";
import { PreviewComponent } from './preview/preview.component';
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from "@angular/material/snack-bar";

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
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
