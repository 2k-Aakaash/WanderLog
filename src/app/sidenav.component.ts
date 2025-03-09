import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar">
      <h1 class="logo">WanderLog</h1>
      <nav>
        <button class="nav-button" routerLink="/write-diary">Write Diary</button>
        <button class="nav-button" routerLink="/home">Home</button>
        <button class="nav-button" routerLink="/all-logs">All Logs</button>
        <button class="nav-button" routerLink="/tags">Tags</button>
        <button class="nav-button" routerLink="/archived">Archived</button>
        <button class="nav-button" routerLink="/favorites">Favorites</button>
        <button class="nav-button" routerLink="/settings">Settings</button>
      </nav>
      <button class="help-button" routerLink="/help">About & Help</button>
    </aside>
  `,
  styles: [
    `
    .sidebar { width: 250px; background: #8B5A2B; padding: 15px; height: 100vh; }
    .logo { color: #4A2C1D; font-size: 24px; font-weight: bold; }
    .nav-button, .help-button { background: #D4A373; border: none; padding: 10px; width: 100%; margin: 5px 0; cursor: pointer; }
    .nav-button.active { background: #C87941; }
    `
  ]
})
export class SidebarComponent { }
