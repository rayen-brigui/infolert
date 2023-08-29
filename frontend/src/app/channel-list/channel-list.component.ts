import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { subscriptions, Notifications } from '../Data';
@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  providers: [DatePipe],
})
export class ChannelListComponent implements AfterViewInit {
  mergedNotifications: any[] = []; // This will hold the final merged data
  constructor(private route: ActivatedRoute, private datePipe: DatePipe) {}

  getTimeSinceReceived(createdAt: Date): string {
    const now = new Date();
    const timeDifference = now.getTime() - createdAt.getTime();
    const formattedTime = this.datePipe.transform(timeDifference, 'h:mm:ss');
    return formattedTime || ''; // Provide a default value if formattedTime is null
  }
  md: any = '';
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.md = params['id'];
      this.mergeData(this.md);
    });
  }
  subscriptions = subscriptions;
  Notifications = Notifications;

  mergeData(md: string) {
    this.Notifications = this.Notifications.filter(
      (notif) => notif.application === md
    );
    this.subscriptions = this.subscriptions.filter((sub) => sub.PK === md);
    // add here the code i requested
    function addNotificationsToSubscriptions(
      subscriptions: Subscription[],
      notifications: Notification[]
    ) {
      for (const notification of notifications) {
        const matchingSubscription = subscriptions.find(
          (sub) => sub.SK === notification.PK
        );

        if (!matchingSubscription) {
          subscriptions.push({
            SK: notification.PK,
            ChannelName: notification.PK,
            Description: notification.PK,
            PK: notification.application,
          });
        }
      }
    }

    addNotificationsToSubscriptions(this.subscriptions, this.Notifications);
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
  @ViewChild('modal', { static: false }) modal!: IonModal;

  ngAfterViewInit() {
    // Now you can safely use this.modal
  }
  message: string = '';
  msg: msg = {
    PK: '',
    SK: '',
    body: '',
    createdAt: '2023-05-03 13:15:46.966998',
    title: '',
    TTL: 0,
    application: '',
    channel: '',
  };
  name: string = '';
  modalVisible = false; // Add this property

  dismissModal() {
    this.modalVisible = false; // Hide the modal content
    setTimeout(() => {
      this.modal.dismiss(); // Dismiss the modal after a small delay
    }, 300); // Adjust the delay as needed
  }

  async openModal(msg: any, CN: string) {
    this.msg = msg;
    this.msg.channel = CN;
    this.modalVisible = true; // Show the modal content
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

  /************ */
}

interface msg {
  PK: string;
  SK: string;
  TTL: number;
  application: string;
  body: string;
  createdAt: string;
  title: string;
  channel: string;
}

interface Subscription {
  SK: string;
  ChannelName: string;
  Description: string;
  PK: string;
}

interface Notification {
  PK: string;
  SK: string;
  body: string;
  createdAt: string;
  title: string;
  TTL: number;
  application: string;
}

interface FilteredNotification {
  title: string;
  message: {
    body: string;
    createdAt: string;
    TTL: number;
    application: string;
  }[];
}
