require("dotenv").config();

const chalk = require("chalk");
const path = require("path");
const fs = require("fs").promises;

const lastEmailIndex = path.join(
  __dirname,
  "./",
  "db/",
  "last-sent-email-index.txt"
);

/* Customizable variables */
const user = process.env.EMAIL_ACCOUNT;
const password = process.env.EMAIL_PASSWORD;
const delayBetweenEmails = 1500;
const delayBetweenSteps = 150;

const emailSender = {
  login: async page => {
    console.log(chalk.whiteBright.inverse("Logging in Gmail..."));

    await page.goto(
      "https://accounts.google.com/AccountChooser?service=mail&continue=https://mail.google.com/mail/"
    );

    await page.waitForSelector(`input[type='email']`);
    await page.type(`input[type='email']`, user, { delay: 15 });
    await page.keyboard.press("Enter");

    await page.waitForNavigation(["networkidle0", "load", "domcontentloaded"]);
    await page.waitFor(3550);
    await page.waitForSelector(`input[type='password']`);
    await page.type(`input[type='password']`, password, { delay: 15 });
    await page.keyboard.press("Enter");
    await page.waitForNavigation(["networkidle0", "load", "domcontentloaded"]);

    console.log(chalk.whiteBright.inverse("Logged in succesfully."));
    await page.waitFor(5000);
  },
  writeNewEmail: async (page, { index, subject, email, message }) => {
    console.log(chalk.whiteBright.inverse(`${index}. Writing new e-mail...`));

    const $newEmailButton = `[jscontroller] > [id] > [class] > [id] div[style][role='button'][class]`;
    const $emailInput = `textarea[name = "to"]`;
    const $subjectInput = `input[name='subjectbox']`;
    const $messageInput = `[aria-label*='mensagem'][role=textbox]`;
    const $emailIsBeingSent = `[aria-live="assertive"] > div > div:nth-child(2) > span > span:nth-child(1)`;

    await page.waitForSelector($newEmailButton);
    await page.click($newEmailButton);

    await page.waitForSelector($emailInput);
    await page.type($emailInput, email);
    await page.waitFor(delayBetweenSteps);

    await page.waitForSelector($subjectInput);
    await page.type($subjectInput, subject);
    await page.waitFor(delayBetweenSteps);

    await page.waitForSelector($messageInput);
    await page.type($messageInput, message);
    await page.waitFor(delayBetweenSteps);

    await page.keyboard.press("Tab");
    await page.waitFor(delayBetweenSteps);
    await page.keyboard.press("Enter");
    await page.waitFor(delayBetweenSteps);
    await page.waitForSelector($emailIsBeingSent);

    try {
      emailSender.saveLastSentEmailIndex(index);
      console.log(`${chalk.whiteBright(email)} finished.`);
    } catch (error) {
      console.log(`${Number(index)}. Couldn't check if e-mail was delivered.`);
    }

    await page.waitFor(delayBetweenEmails);
  },
  getLastSentEmailIndex: async _ => {
    try {
      const index = await fs.readFile(lastEmailIndex, "utf8");
      return Number(index);
    } catch (err) {
      console.error(err);
    }
  },
  saveLastSentEmailIndex: async index => {
    try {
      await fs.writeFile(lastEmailIndex, index);
      console.log(chalk.green("Updated index succesfully."));
    } catch (err) {
      console.error(err);
    }
  }
};

module.exports = emailSender;
