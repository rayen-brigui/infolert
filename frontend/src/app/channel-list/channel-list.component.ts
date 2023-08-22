import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class ChannelListComponent {
  mergedNotifications: any[] = []; // This will hold the final merged data

  constructor(private route: ActivatedRoute) {}
  md: any = '';
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.md = params['id'];
      this.mergeData(this.md);
    });
  }

  subscriptions = [
    {
      SK: 'App1-defaultChannel',
      ChannelName: 'App1-defaultChannel',
      Description: 'default Channel',
      PK: 'App1',
    },

    {
      SK: 'App1-Channel1',
      ChannelName: 'App1-Channel1',
      Description: 'Channel1',
      PK: 'App1',
    },

    {
      SK: 'App2-defaultChannel',
      ChannelName: 'App2-defaultChannel',
      Description: 'default Channel',
      PK: 'App2',
    },
  ];

  Notifications = [
    {
      PK: 'mohamed.salah@draexlmaier.com',
      SK: 'acf364e530',
      body: 'it works ',
      createdAt: '2023-05-03 13:15:46.966998',
      title: 'this is my demo',
      TTL: 1683724546,
      application: 'App1',
    },

    {
      PK: 'App1-Channel1',
      SK: 'b6d9f5150955',
      body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. dard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum ',
      createdAt: '2023-05-11 08:42:01.490251',
      title: 'Critical Notification',
      TTL: 1684399321,
      application: 'App1',
    },

    {
      PK: 'App2-defaultChannel',
      SK: 'd45219bc84d68e165',
      body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. dard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum ',
      createdAt: '2023-05-26 08:29:11.035910',
      title: 'Critical Notification',
      TTL: 1684398551,
      application: 'App2',
    },
  ];

  mergeData(md: string) {
    this.Notifications = this.Notifications.filter(
      (notif) => notif.application === md
    );
    this.subscriptions = this.subscriptions.filter((sub) => sub.PK === md);

    this.mergedNotifications = this.subscriptions.map((subscription) => {
      const matchingNotifications = this.Notifications.filter(
        (notif) => notif.PK === subscription.SK
      );

      if (matchingNotifications.length === 0) {
        const matchingChannel = this.Notifications.find(
          (channel) => channel.application === subscription.PK
        );

        if (matchingChannel) {
          return {
            title: matchingChannel.PK,
            messages: [matchingChannel],
          };
        }
      }

      return {
        title: subscription.Description,
        messages: matchingNotifications,
      };
    });
  }

  /******************* */

  @ViewChild(IonModal)
  modal!: IonModal;
  message: string = '';
  msg: msg = {
    PK: '',
    SK: '',
    body: '',
    createdAt: '2023-05-03 13:15:46.966998',
    title: '',
    TTL: 0,
    application: '',
  };
  name: string = '';
  cancel() {
    this.modal.dismiss();
  }

  confirm() {
    // Handle the confirmation logic here, e.g., save the name
    this.modal.dismiss({ name: this.name });
  }
  async openModal(msg: any) {
    this.msg = msg;
    return await this.modal.present();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
  /******************** */
  public alertButtons = ['OK'];
}

interface msg {
  PK: string;
  SK: string;
  TTL: number;
  application: string;
  body: string;
  createdAt: string;
  title: string;
}
