import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';
// import { Chat } from './components/chat/chat';
import { ChatComponent } from './components/chat/chat';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ChatComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('frontend');
}
