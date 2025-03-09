import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // Ensure the correct path
import { routes } from './app/app.routes'; // Change 'appRoutes' to 'routes'
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)] // Change 'appRoutes' to 'routes'
}).catch(err => console.error(err));
