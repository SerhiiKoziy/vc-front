import React from 'react';
import ReactDOM from 'react-dom/server';
const bunyan = require('bunyan');
const nodemailer = require('nodemailer');

// Create a SMTP transporter object
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 's.koziy@mobilunity.com',
    pass: '1478965Z',
  },
  logger: bunyan.createLogger({
    name: 'nodemailer',
  }),
  debug: true, // include SMTP traffic in the logs
}, {
  // default message fields

  // sender info
  from: 'Pangalink <s.koziy@mobilunity.com>',
  headers: {
    'X-Laziness-level': 1000, // just an example header, no need to use this
  },
});
// https://accounts.google.com/signin/continue?sarp=1&scc=1&plt=AKgnsbtFoSoYzkzcoJ-hbYK6QfLB3yiWPXM49tOIgUCK59VP4ZXAccsclaUzCLhKQigFCa8IGRWitVdQSQB-6zL3eBxni5Q1wXHNj4tMS1yuKOkD4dVq39Pd1QK3Xq0kfTOPmKrIRfcie5sjlfAcNKnKTn7sqGVbBGY7j1NHVSBwyLXG6efBAMIWBb9c424Sy38un0CeoFfC61_lRVeOE1uA1tu0bKHQhkDBDvjVDKN1bj8SiMz04B0>
console.log('SMTP Configured');

const DEFAULT_EMAIL = 's.koziy@mobilunity.com';

class Email extends React.PureComponent {
  render() {
    const { from, user } = this.props;
    const userObjectSend = {
      username: user.username,
      title: user.title,
      experience: user.experience,
      cost: user.cost,
      inHouse: user.inHouse,
    };
    return (
      <div>
        <p>{from}</p>
        <pre><code>{JSON.stringify(userObjectSend, null, 4)}</code></pre>
      </div>
    );
  }
}

function createMessage(from, user = {}) {
  console.log('Sending Mail', from, user);
  return {

    // Comma separated list of recipients
    to: `Name Surname ${DEFAULT_EMAIL}`,

    // Subject of the message
    subject: `Contact meee!! ${from}`, //

    // plaintext body
    text: 'Hello to myself!',

    // HTML body
    // html: `${from} ${JSON.stringify(user)}`,
    html: ReactDOM.renderToString(<Email from={from} user={user} />),

    // Apple Watch specific HTML body
    watchHtml: '<b>Hello</b> to myself',
  };
}
console.log('Sending Mail');
export default function sendMessage(from, user) {
  user = user || {};
  return new Promise((resolve, reject) => {
    transporter.sendMail(createMessage(from, user), (error, info) => {
      if (error) {
        console.log('Error occurred');
        // console.log(error.message, from, user);
        reject(error);
        return;
      }
      console.log('Message sent successfully!');
      console.log('Server responded with "%s"', info.response);
      transporter.close();
      resolve(info);
    });
  });
}
