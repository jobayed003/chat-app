import moment from 'moment';

export const randomName = [
   {
      name: 'Jobayed',
      status: 'online',
      messageDetails: {
         messageStatus: '',
         lastMessages: ['Hey I wrote you a message', 'Hey man reply me !!!'],
         sent: moment().format('h:mm a'),
      },
      img: '/assets/user.jpeg',
      lastActive: 'Active 1min ago',
   },

   {
      name: 'Hossain',
      status: 'online',
      messageDetails: {
         messageStatus: 'typing',
         lastMessages: [],
         sent: moment().format('h:mm a'),
      },
      img: '/assets/user.jpeg',
      lastActive: 'Active 1min ago',
   },
   {
      name: 'Hossain',
      status: 'online',
      messageDetails: {
         messageStatus: '',
         lastMessages: ['Hey I wrote you a message', 'Hello??'],
         sent: moment().format('h:mm a'),
      },
      img: '/assets/user.jpeg',
      lastActive: 'Active 1min ago',
   },
];

export const buttonStyles = {
   fontSize: '14px',
   fontWeight: 'medium',
   borderRadius: '25px',
   background: 'none',
   _focus: {
      boxShadow: '0',
      background: '#F4F4F4',
   },
   _active: {
      boxShadow: '0',
      background: '#F4F4F4',
   },
};
