import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidenav.component';
import { HeaderComponent } from './header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, HeaderComponent],
  template: `
    <div class="container">
      <app-sidebar></app-sidebar>
      
      <main class="content">
        <app-header></app-header>

        <section class="itinerary">
          <h2>Itinerary</h2>
          <div class="plan-container">
            <div class="plan-card" *ngFor="let plan of plans">
              <h3>{{ plan.title }}</h3>
              <ul>
                <li *ngFor="let item of plan.schedule">{{ item }}</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="logs">
          <h2>All Logs</h2>
          <h3>{{ todayDate }}</h3>
          <img src="assets/munnar.jpg" alt="Munnar Diaries" class="log-image" />
        </section>
      </main>
    </div>
  `,
  styles: [
    `
    .container { display: flex; height: 100vh; background: #E8C6A0; }
    .content { flex-grow: 1; padding: 20px; }
    .itinerary { margin-bottom: 20px; }
    .plan-container { display: flex; gap: 10px; }
    .plan-card { background: #C87941; padding: 10px; border-radius: 5px; }
    .logs { text-align: center; }
    .log-image { width: 100%; max-height: 300px; object-fit: cover; border-radius: 10px; }
    `
  ]
})
export class AppComponent {
  todayDate = new Date().toLocaleDateString();
  plans = [
    { title: 'Kochi Plan', schedule: ['4:00 AM - Start Journey', '6:00 AM - Coffee Break', '9:00 AM - Search for Stays', '10:00 AM - Rest', '1:00 PM - Lunch', '2:00 PM - Sightseeing', '6:00 PM - End Ride'] },
    { title: 'Ladakh Plan', schedule: ['4:00 AM - Start Journey', '6:00 AM - Coffee Break', '9:00 AM - Search for Stays', '10:00 AM - Rest', '1:00 PM - Lunch', '2:00 PM - Sightseeing', '6:00 PM - End Ride'] },
    { title: 'Kozhikode Plan', schedule: ['4:00 AM - Start Journey', '6:00 AM - Coffee Break', '9:00 AM - Search for Stays', '10:00 AM - Rest', '1:00 PM - Lunch', '2:00 PM - Sightseeing', '6:00 PM - End Ride'] },
    { title: 'Thekkady Plan', schedule: ['4:00 AM - Start Journey', '6:00 AM - Coffee Break', '9:00 AM - Search for Stays', '10:00 AM - Rest', '1:00 PM - Lunch', '2:00 PM - Sightseeing', '6:00 PM - End Ride'] }
  ];
}
