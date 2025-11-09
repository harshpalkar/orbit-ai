import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrbitService } from '../../services/orbit';

interface Message { sender: 'user' | 'orbit'; text: string; }

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css'],
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  messages: Message[] = [];
  userInput = '';
  loading = false;

  constructor(private orbit: OrbitService) {}

  ngAfterViewChecked() { this.scrollToBottom(); }

  onEnter(evt: KeyboardEvent) {
    // allow shift+enter for newline
    if (evt.shiftKey) return;
    evt.preventDefault();
    this.send();
  }

  send() {
    const text = this.userInput?.trim();
    if (!text) return;

    this.messages.push({ sender: 'user', text });
    this.userInput = '';
    this.loading = true;

    this.orbit.chat(text).subscribe({
      next: (res) => {
        this.messages.push({ sender: 'orbit', text: res.reply ?? 'No response' });
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.messages.push({ sender: 'orbit', text: '⚠️ Error connecting to Orbit.' });
        this.loading = false;
      }
    });
  }

  clear() {
    this.messages = [];
  }

  scrollToBottom() {
    try {
      const el = this.chatContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch {}
  }
}
