import moment from 'moment';

export const randomName = [
   {
      id: '3e40a899b3d9d',
      name: 'Jobayed',
      status: 'online',
      messageDetails: {
         messageStatus: '',
         lastMessages: ['Hey I wrote you a message', 'Hey man reply me !!!'],
         sent: moment().format('hh:mm a'),
      },
      img: '/assets/user.jpeg',
      lastActive: 'Active 1min ago',
   },

   {
      id: '1fd8e93d0fde2',

      name: 'Hossain',
      status: 'online',
      messageDetails: {
         messageStatus: 'typing',
         lastMessages: [],
         sent: moment().format('hh:mm a'),
      },
      img: '/assets/user.jpeg',
      lastActive: 'Active 1min ago',
   },
   {
      id: 'b268ff25ab7c5',

      name: 'Hossain',
      status: 'online',
      messageDetails: {
         messageStatus: '',
         lastMessages: ['Hey I wrote you a message', 'Hello??'],
         sent: moment().format('hh:mm a'),
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
const uniqueId = Math.random().toString(16).slice(2);
console.log(uniqueId);
