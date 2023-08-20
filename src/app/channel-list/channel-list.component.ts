import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
md:any='';
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
      body: 'it works ',
      createdAt: '2023-05-11 08:42:01.490251',
      title: 'this is my demo',
      TTL: 1684399321,
      application: 'App1',
    },

    {
      PK: 'App2-defaultChannel',
      SK: 'd45219bc84d68e165',
      body: 'it works ',
      createdAt: '2023-05-26 08:29:11.035910',
      title: 'this is my demo title  001',
      TTL: 1684398551,
      application: 'App2',
    },
  ];
  
  mergeData(md: string) {
    this.Notifications=this.Notifications.filter(
      (notif) =>  notif.application === md );
      this.subscriptions=this.subscriptions.filter(
        (sub) =>  sub.PK === md );

    this.mergedNotifications = this.subscriptions.map((subscription) => {
      const matchingNotifications = this.Notifications.filter(
        (notif) =>  notif.PK === subscription.SK 
      );
                        
      if (matchingNotifications.length === 0) {
        const matchingChannel = this.Notifications.find(
          (channel) => channel.application === subscription.PK);

        if (matchingChannel) {
          return {
            title: matchingChannel.PK,
            messages: [matchingChannel],};}
      }

      return {
        title: subscription.Description,
        messages: matchingNotifications,
      };
    });
  }
}
