import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-root',
    standalone: true, // Ensure this is a standalone component
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class AppComponent {
    menuOpen = false;
}
