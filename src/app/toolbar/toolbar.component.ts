import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { DownloadingProgressService } from "../download-progress/downloading-progress.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
  ]
})
export class ToolbarComponent implements OnInit {
  downloadingProgressService = inject(DownloadingProgressService);

  ngOnInit(): void {
    window.addEventListener('message', this.onMessage)
  }

  onMessage = (event: MessageEvent) => {
    const action = event.data;
    if (/^zip/.test(action)) {
      this.downloadingProgressService.handleAction(action);
    }
  }
}
