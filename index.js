const puppeteer = require("puppeteer-extra");
const emailSender = require("./email-sender");
const fs = require("fs");
const path = require("path");
const pluginStealth = require("puppeteer-extra-plugin-stealth");

const emailList = fs
  .readFileSync(path.join(__dirname, "./", `resources/email-list.txt`), "utf8")
  .split("\n");

/* Customizable variables */
const subject = "this is a test";
const message =
  "Hello there,\n\rI hope you're having a great day.\n\rKind regards,\rJohn.";

(async () => {
  puppeteer.use(pluginStealth());
  const browser = await puppeteer.launch({
    headless: false,
    timeout: 0
  });

  const lastEmailIndex = await emailSender.getLastSentEmailIndex();

  const page = await browser.newPage();
  await emailSender.login(page);

  for (let i = lastEmailIndex; i < emailList.length; i++) {
    await emailSender.writeNewEmail(page, {
      index: i,
      subject,
      email: emailList[i],
      message
    });
  }

  await browser.close();
})();
