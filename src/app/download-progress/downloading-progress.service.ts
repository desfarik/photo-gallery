import { inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { DownloadingProgressComponent } from "./downloading-progress.component";

@Injectable({
  providedIn: 'root'
})
export class DownloadingProgressService {
  snackBar = inject(MatSnackBar);
  downloadedItems = signal(0);
  downloadFailed = signal(false);
  downloadFinished = signal(false);
  handleAction(action: string) {
    switch (action) {
      case 'zip:start': {
        this.downloadedItems.set(0);
        this.downloadFailed.set(false);
        this.downloadFinished.set(false);

        this.snackBar.openFromComponent(DownloadingProgressComponent, {horizontalPosition: "end"});
        return;
      }
      case 'zip:finish': {
        console.log('finish');
        this.downloadFinished.set(true);
        return;
      }
      case 'zip:error': {
        console.log('error')
        this.downloadFailed.set(true);
        return;
      }
      default: {
        const [, item] = action.split('-')
        this.downloadedItems.set(Number(item));
      }
    }

  }
}
