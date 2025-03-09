import { Routes } from '@angular/router';
import { AllLogsComponent } from './all-logs/all-logs.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: 'logs', component: AllLogsComponent },
    { path: '', component: AppComponent },
];
