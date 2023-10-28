import { Component } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    standalone: true,
    imports: [
        MatButtonModule
    ]
})
export class ToolbarComponent {

}
