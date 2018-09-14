# DemocracyOS API Notifier

API Notifications with agenda and nodemailer

## Configuration
- Install dependencies

```sh
$ npm install
```

- Set environment variables

```
MONGO_URL='mongodb://<my-mongo-url>/<database-name>'
ORGANIZATION_EMAIL=your-organization@mail.com
ORGANIZATION_NAME='My Organization'
NODEMAILER_HOST=your.host.com
NODEMAILER_PASS=yourservicemailpass
NODEMAILER_USER=yourservice@mail.com
```

## ¡Run server, run!

```sh
$ npm run dev
```

Server will run on port 3000.
At the moment, try make a POST request to 

```sh
/api/sendemail
```

with this body structure

```sh
{
	"email":"myemailaccount@mail.com"
}
```