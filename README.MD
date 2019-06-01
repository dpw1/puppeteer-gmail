# Puppeteer Gmail

Puppeteer Gmail is a simple tool to automate e-mail sending within the Gmail website.

![Puppeteer Gmail](/demo/puppeteer-gmail-gif.gif)

## Features

- It uses [Puppeteer Stealth](https://www.npmjs.com/package/puppeteer-extra-plugin-stealth) to avoid major issues;
- It does not use SMTP. Therefore you can send from 500 to 2000 e-mails a day; (depending on your account limits)
- Sends about 3 e-mails/minute; (it varies from computer to computer)
- It makes use of a simple .txt file to save the index of the last sent e-mail. It means that when you stop the software it will restart from the last e-mail sent;
- Contains console.log messages to keep you on track of what is going on.

## Usage:

### Install dependencies

Install dependencies using npm.

```
npm install
```

### Setup your account

Create a .env file in the root directory. In there, add your gmail e-mail and password:

```
EMAIL_ACCOUNT = myemail@gmail.com
EMAIL_PASSWORD = pass123
```

### E-mail list

Go to to resources/email-list.txt and add the e-mails you'd like to send. For testing purposes I recommend using your own e-mail three times.

```
myemail@gmail.com
myemail@gmail.com
myemail@gmail.com
```

### E-mail content

Go to index.js and change the variables "subject" and "message". Use "\r" for a line break and "\n\r" for two lines break.

### Start

Go to the root folder and run the project.

```
node index.js
```

Enjoy! :)

## Heads up:

- You may need to change the CSS selectors for each field in the writeNewEmail function found at email-sender.js. Since my Gmail account is from Brazil some fields were in Portuguese, yours may be different. Please keep that in mind.
- Whenever you start a new project make sure you reset the value at db/last-sent-email-index.txt to 0.
- Misuse of this software may have legal consequences. Please follow [Gmail rules](https://support.google.com/a/answer/166852?hl=en) and use it at your own risk.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/dpw1/puppeteer-gmail/blob/master/LICENSE.MD) file for details
