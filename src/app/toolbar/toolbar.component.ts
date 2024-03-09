import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { DownloadingProgressService } from "../download-progress/downloading-progress.service";
import { PhotoGeneratorService } from "../service/photo-generator.service";
import groupping from '../../../scripts/groupping.json';
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    NgForOf,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnInit {
  downloadingProgressService = inject(DownloadingProgressService);
  photoGeneratorService = inject(PhotoGeneratorService);

  PEOPLE = Object.keys(groupping).filter(person => person !== 'HAPPY_HUSBAND' && person !== 'BEST_WIFE');

  activeFilters = computed(() => {
    return new Set<string>(this.photoGeneratorService.filters())
  })

  ngOnInit(): void {
    window.addEventListener('message', this.onMessage)
  }

  onMessage = (event: MessageEvent) => {
    const action = event.data;
    if (/^zip/.test(action)) {
      this.downloadingProgressService.handleAction(action);
    }
  }

  filterBy(filter: string) {
    this.photoGeneratorService.toggleFilter(filter);
  }
}
