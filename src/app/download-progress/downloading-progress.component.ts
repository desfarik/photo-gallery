import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DownloadingProgressService } from "./downloading-progress.service";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { IMAGE_LENGTH } from "../photo-url.constants";
import { MatButtonModule } from "@angular/material/button";
import { NgIf } from "@angular/common";
import { MatSnackBarRef } from "@angular/material/snack-bar";

@Component({
  selector: 'app-downloading-progress',
  templateUrl: './downloading-progress.component.html',
  styleUrls: ['./downloading-progress.component.scss'],
  imports: [
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    NgIf
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadingProgressComponent {
  downloadingProgressService = inject(DownloadingProgressService)
  snackBarRef = inject(MatSnackBarRef);
  IMAGE_LENGTH = IMAGE_LENGTH;

  downloadedPercent = computed(() => Math.floor(this.downloadingProgressService.downloadedItems() / IMAGE_LENGTH * 100))
  downloadedInProgress = computed(() => !(this.downloadingProgressService.downloadFinished() || this.downloadingProgressService.downloadFailed()))
}
