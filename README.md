# DemocracyOS Notifier
Embeddable notifications engine that relies on MongoDB for job queuing and scheduling. Powered by rschmukler/agenda

## Mailer Configuration

Uses [NodeMailer](https://www.npmjs.com/package/nodemailer) package for email handling. Available services are the ones listed on the [nodemailer-wellknown](https://github.com/andris9/nodemailer-wellknown#supported-services) repo.

### SendGrid Example

```javascript
var notifier = require('democracyos-notifier')({
  mailer: {
    service: 'sendgrid',
    auth: {
      user: 'fake-sendgrid-user!@sendgrid.com',
      pass: 'fake-sendgrid-pass'
    }
  }
})
```

### Gmail Example

```javascript
var notifier = require('democracyos-notifier')({
  mailer: {
    service: 'gmail',
    auth: {
      user: 'fake-gmail-user!@gmail.com',
      pass: 'fake-gmail-pass'
    }
  }
})
```

### Direct Transport Example

Not recommended for `production`. Using direct transport is not reliable as outgoing port 25 used is often blocked by default. Additionally mail sent from dynamic addresses is often flagged as spam. You should really consider using a SMTP provider.

```javascript
var notifier = require('democracyos-notifier')()
```

### Testing the code
First install packages with `npm install`

Then modify [`example.js`](./example.js) from and to mails.

Test running `node example.js`