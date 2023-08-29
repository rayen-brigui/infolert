import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // import function to register Swiper Core custom elements
import { register } from 'swiper/element';
import { IonicSlides } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChannelListComponent } from '../channel-list/channel-list.component';
import { NavController } from '@ionic/angular';
import { subscriptions, Notifications } from '../Data';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';


// register Swiper custom elements
register();

// register Swiper custom elements
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  constructor(private navCtrl: NavController) {}

  navigateToChannelList(object: string) {
    this.navCtrl.navigateForward(`/apps/${object}`);
  }
  swiperModules = [IonicSlides];
  component = ChannelListComponent;
  subscriptions = subscriptions;
  // subscriptions = [
  //   {
  //     SK: 'App2-Channel2',
  //     ChannelName: 'App2-Channel2',
  //     Description: 'Channel2',
  //     PK: 'App2',
  //   },
  //   {
  //     SK: 'App3-defaultChannel',
  //     ChannelName: 'App3-defaultChannel',
  //     Description: 'default Channel',
  //     PK: 'App3',
  //   },
  //   {
  //     SK: 'App3-Channel1',
  //     ChannelName: 'App3-Channel1',
  //     Description: 'Channel1',
  //     PK: 'App3',
  //   },
  //   {
  //     SK: 'App4-defaultChannel',
  //     ChannelName: 'App4-defaultChannel',
  //     Description: 'default Channel',
  //     PK: 'App4',
  //   },
  //   {
  //     SK: 'App4-Channel1',
  //     ChannelName: 'App4-Channel1',
  //     Description: 'Channel1',
  //     PK: 'App4',
  //   },
  //   {
  //     SK: 'App1-defaultChannel',
  //     ChannelName: 'App1-defaultChannel',
  //     Description: 'default Channel',
  //     PK: 'App1',
  //   },
  //   {
  //     SK: 'App1-Channel1',
  //     ChannelName: 'App1-Channel1',
  //     Description: 'Channel1',
  //     PK: 'App1',
  //   },
  //   {
  //     SK: 'App2-defaultChannel',
  //     ChannelName: 'App2-defaultChannel',
  //     Description: 'default Channel',
  //     PK: 'App2',
  //   },
  //   {
  //     SK: 'App2-defaultChannel',
  //     ChannelName: 'App2-defaultChannel',
  //     Description: 'default Channel',
  //     PK: 'App5',
  //   },
  //   {
  //     SK: 'App6-defaultChannel',
  //     ChannelName: 'App6-defaultChannel',
  //     Description: 'default Channel',
  //     PK: 'App6',
  //   },
  //   // Add more entries here
  // ];

  uniquePKs: string[] = [];
  uniquePKArray: { PK: string; Descriptions: string[] }[] = [];
  ngOnInit() {
    this.extractUniquePKs();
    console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
        console.log('====================================');
        console.log('can not register :)');
        console.log('====================================');
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      alert('Push registration success, token: ' + token.value);
      console.log('====================================');
      console.log(token.value);
      console.log('====================================');
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }
  private extractUniquePKs() {
    for (const subscription of this.subscriptions) {
      const { PK, Description } = subscription;
      const existingEntry = this.uniquePKArray.find((entry) => entry.PK === PK);

      if (existingEntry) {
        existingEntry.Descriptions.push(Description);
      } else {
        this.uniquePKArray.push({ PK, Descriptions: [Description] });
      }
    }
    this.uniquePKs = this.uniquePKArray.map((entry) => entry.PK);
  }
}
