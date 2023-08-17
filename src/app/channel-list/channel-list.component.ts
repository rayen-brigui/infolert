import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class ChannelListComponent {
  channels: Channel[] = [
    {
      name: 'Channel 1',
      messages: ['Message 1-1', 'Message 1-2', 'Message 1-3'],
      showMessages: false,
    },
    {
      name: 'Channel 2',
      messages: ['Message 2-1', 'Message 2-2'],
      showMessages: false,
    },
    // Add more channels and messages as needed
  ];

  toggleMessages(channel: Channel): void {
    channel.showMessages = !channel.showMessages;
  }
}

interface Channel {
  name: string;
  messages: string[];
  showMessages: boolean;
}
