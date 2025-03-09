import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule],
    template: `
    <header class="topbar">
      <input type="text" placeholder="Search Diaries" class="search-box" />
    </header>
  `,
    styles: [
        `
    .topbar { background: #A9714B; padding: 10px; display: flex; justify-content: center; }
    .search-box { width: 60%; padding: 8px; border: none; border-radius: 5px; }
    `
    ]
})
export class HeaderComponent { }
