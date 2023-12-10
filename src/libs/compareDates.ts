import moment from 'moment';

export const compareDates = (millis1: number) => {
   const present = Date.now();
   const date1 = new Date(millis1);
   const date2 = new Date(present);
   const moment1 = moment(date1);
   const moment2 = moment(date2);
   const difference = moment.duration(moment2.diff(moment1));
   return {
      date1,
      date2,
      difference,
   };
};
