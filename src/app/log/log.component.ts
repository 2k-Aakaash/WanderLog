import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-log',
    standalone: true,
    template: `
    <div class="log-entry">
      <h2>{{ logDate }}</h2>
      <div class="log-image" [style.backgroundImage]="'url(' + logImage + ')'"></div>
      <h3>{{ logTitle }}</h3>
    </div>
  `,
    styles: [
        `
    .log-entry {
      background: #f4e1c1;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .log-image {
      width: 100%;
      height: 200px;
      background-size: cover;
      background-position: center;
      border-radius: 8px;
    }
    h2, h3 {
      color: #4a2c15;
    }
    `
    ]
})
export class LogComponent {
    @Input() logDate!: string;
    @Input() logTitle!: string;
    @Input() logImage!: string;
}
