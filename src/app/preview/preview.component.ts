import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PhotoComponent } from "../photo-gallery/photo/photo.component";
import { BLUR_PHOTO_URL, MEDIUM_PHOTO_URL } from "../photo-url.constants";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PhotoComponent
  ]
})
export class PreviewComponent {

  mainPhoto = {
    url: MEDIUM_PHOTO_URL(152),
    blurUrl: BLUR_PHOTO_URL(152),
  };

}
