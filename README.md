# DemocracyOS API Notifier

API Notifications with agenda and nodemailer

## Configuration
- Install dependencies

```sh
$ npm install
```

- Set environment variables

```
JOB_TYPES=jobNameTypes
MONGO_URL='mongodb://<my-mongo-url>/<database-name>'
AGENDA_COLLECTION=collectionName
ORGANIZATION_EMAIL=your-organization@mail.com
ORGANIZATION_NAME='My Organization'
NODEMAILER_SERVICE=yourservicemail
NODEMAILER_PASS=yourservicemailpass
NODEMAILER_USER=yourservice@mail.com
```

For the JOB_TYPES variable you can set more than one comma separated
Example: 'welcome-email,comment-reply, ...'

For this example only "welcome-email" exist.

## ¡Run server, run!

```sh
$ npm run dev
```

Server will run on port 3000.
At the moment, try make a POST request to 
```sh
/api/users
```
with this body structure
```sh
{
	"username": "myusername"
	"email":"myemailaccount@mail.com"
}
```