import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  template: `
  `,
  styles: [`
    .spacer { flex: 1; }
    .search-bar { width: 40%; }
  `],
  imports: [MatToolbarModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class ToolbarComponent { }
