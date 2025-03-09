import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogComponent } from '../log/log.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidenav.component';
import { HeaderComponent } from '../header.component';

@Component({
  selector: 'app-all-logs',
  standalone: true,
  imports: [CommonModule, LogComponent, RouterModule, SidebarComponent, HeaderComponent],
  template: `
    <div class="container">
      <app-sidebar></app-sidebar>
      
      <main class="content">
        <app-header></app-header>
        
        <section class="logs-list">
          <app-log date="31 March 2025" title="Munnar Diaries" image="assets/munnar.jpg"></app-log>
          <app-log date="15 December 2024" title="Alapphuza Adventures" image="assets/alapphuza.jpg"></app-log>
        </section>
      </main>
    </div>
  `,
  styles: [
    `
    .container { display: flex; height: 100vh; background: #E8C6A0; }
    .content { flex-grow: 1; }
    .logs-list { padding: 20px; }
    `
  ]
})
export class AllLogsComponent { }
