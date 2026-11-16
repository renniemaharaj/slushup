import { Cake, BriefcaseBusiness, Heart, UsersRound } from '@lucide/svelte';

export const occasions = [
  {
    title: 'Birthday Parties',
    description:
      'Another year. A little more flavour. Celebrate in style with custom drinks made for your day.',
    image: 'blue-frozen-treat.jpeg',
    position: 'center 48%',
    icon: Cake
  },
  {
    title: 'Corporate Events',
    description:
      'From product launches to team celebrations, give your guests something to raise a glass to.',
    image: 'bar-image-with-people-wide.jpeg',
    position: 'center',
    icon: BriefcaseBusiness
  },
  {
    title: 'Weddings',
    description: 'Your day, your signature drinks. Make every toast a little more memorable.',
    image: 'signature-drink-wall.jpeg',
    position: 'center 35%',
    icon: Heart
  },
  {
    title: 'Professionals',
    description:
      'Great drinks. Better connections. A refreshing addition to networking events and social gatherings.',
    image: 'people-image-3-wide.jpeg',
    position: 'center',
    icon: UsersRound
  }
];
