import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // import function to register Swiper Core custom elements
import { register } from 'swiper/element';
import { IonicSlides } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChannelListComponent } from '../channel-list/channel-list.component';
import { NavController } from '@ionic/angular';
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
export class HomePage {
  constructor(private navCtrl: NavController) {}

  navigateToChannelList(object: string) {
    this.navCtrl.navigateForward(`/apps/${object}`);
  }
  swiperModules = [IonicSlides];
  component = ChannelListComponent;
  subscriptions = [
    {
      SK: 'App2-Channel2',
      ChannelName: 'App2-Channel2',
      Description: 'Channel2',
      PK: 'App2',
    },
    {
      SK: 'App3-defaultChannel',
      ChannelName: 'App3-defaultChannel',
      Description: 'default Channel',
      PK: 'App3',
    },
    {
      SK: 'App3-Channel1',
      ChannelName: 'App3-Channel1',
      Description: 'Channel1',
      PK: 'App3',
    },
    {
      SK: 'App4-defaultChannel',
      ChannelName: 'App4-defaultChannel',
      Description: 'default Channel',
      PK: 'App4',
    },
    {
      SK: 'App4-Channel1',
      ChannelName: 'App4-Channel1',
      Description: 'Channel1',
      PK: 'App4',
    },
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
    {
      SK: 'App2-defaultChannel',
      ChannelName: 'App2-defaultChannel',
      Description: 'default Channel',
      PK: 'App5',
    },
    {
      SK: 'App6-defaultChannel',
      ChannelName: 'App6-defaultChannel',
      Description: 'default Channel',
      PK: 'App6',
    },
    // Add more entries here
  ];

  uniquePKs: string[] = [];
  uniquePKArray: { PK: string; Descriptions: string[] }[] = [];
  ngOnInit() {
    this.extractUniquePKs();
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
