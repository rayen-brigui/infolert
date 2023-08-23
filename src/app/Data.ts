export const subscriptions = [
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
  // Generated subscriptions
  {
    SK: 'App3-defaultChannel',
    ChannelName: 'App3-defaultChannel',
    Description: 'default Channel',
    PK: 'App3',
  },
  {
    SK: 'App4-defaultChannel',
    ChannelName: 'App4-defaultChannel',
    Description: 'default Channel',
    PK: 'App4',
  },
  // ... and so on for 10 generated subscriptions
];

export const Notifications = [
  {
    PK: 'mohamed.salah@draexlmaier.com',
    SK: 'acf364e530',
    body: 'it works ',
    createdAt: '2023-05-03 13:15:46.966998',
    title: 'this is my demo for MD SALAH fdsfgdsgsdgsdgds',
    TTL: 1683724546,
    application: 'App1',
  },
  {
    PK: 'mohamed.salah@draexlmaier.com',
    SK: 'acf364e530',
    body: 'it works 222222222222222 ',
    createdAt: '2023-05-03 13:15:46.966998',
    title: 'this is 22',
    TTL: 1683724546,
    application: 'App1',
  },
  {
    PK: 'App1-Channel1',
    SK: 'b6d9f5150955',
    body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
    createdAt: '2023-05-11 08:42:01.490251',
    title: 'Critical Notification',
    TTL: 1684399321,
    application: 'App1',
  },
  {
    PK: 'App1-Channel1',
    SK: 'b6d9f5150955',
    body: 'RB is back on the road',
    createdAt: '2023-05-11 08:42:01.490251',
    title: 'just arrived',
    TTL: 1684399321,
    application: 'App1',
  },
  {
    PK: 'App1-defaultChannel',
    SK: 'b6d9f5150955',
    body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
    createdAt: '2023-05-11 08:42:01.490251',
    title: 'Critical Notification',
    TTL: 1684399321,
    application: 'App1',
  },
  // Generated notifications
  {
    PK: 'user1@domain.com',
    SK: 'notification1',
    body: 'Generated notification body 1',
    createdAt: '2023-08-23T12:34:56.789Z',
    title: 'Generated Notification 1',
    TTL: 1684399321,
    application: 'App1',
  },
  {
    PK: 'user2@domain.com',
    SK: 'notification2',
    body: 'Generated notification body 2',
    createdAt: '2023-08-23T12:34:56.789Z',
    title: 'Generated Notification 2',
    TTL: 1684399322,
    application: 'App2',
  },
  // ... and so on for 10 generated notifications
];
