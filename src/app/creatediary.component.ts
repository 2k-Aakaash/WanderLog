import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-creatediary',
    standalone: true,
    template: `
    <div class="diary-container">
      <mat-toolbar color="primary">Create Diary</mat-toolbar>
      <div class="toolbar">
        <button mat-button (click)="applyStyle('bold')"><b>B</b></button>
        <button mat-button (click)="applyStyle('italic')"><i>I</i></button>
        <button mat-button (click)="applyStyle('underline')"><u>U</u></button>
        <input type="color" (change)="changeColor($event)">
        <button mat-button (click)="changeBackground()">Change Background</button>
      </div>
      <div class="diary-editor" contenteditable="true"></div>
    </div>
  `,
    styles: [
        `
    .diary-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      padding: 20px;
      background: #f5f5dc;
    }
    .diary-editor {
      flex-grow: 1;
      padding: 20px;
      background: white;
      border-radius: 10px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      min-height: 300px;
      outline: none;
      overflow-y: auto;
    }
    .toolbar {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }
    `
    ],
    imports: [
        MatToolbarModule,
        MatButtonModule
    ]
})
export class CreateDiaryComponent {
    applyStyle(style: string) {
        document.execCommand(style);
    }

    changeColor(event: any) {
        document.execCommand('foreColor', false, event.target.value);
    }

    changeBackground() {
        const colors = ['#f5f5dc', '#e6e6fa', '#ffe4e1', '#d3d3d3', '#f0e68c'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        (document.querySelector('.diary-container') as HTMLElement).style.background = randomColor;
    }
}
