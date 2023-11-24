const mailchimp = require('@mailchimp/mailchimp_transactional')(process.env.MAILCHIMP_API_KEY);

const messages = {
   from_email: 'hello@example.com',
   subject: 'Hello world',
   text: 'Welcome to Mailchimp Transactional!',
   to: [
      {
         email: 'freddie@example.com',
         type: 'to',
      },
   ],
};

async function run() {
   const response = await mailchimp.messages.send({
      messages,
   });
   console.log(response);
}
run();
