const puppeteer = require("puppeteer");
const assert = require("assert");
const fs = require("fs").promises;
const getDirName = require("path").dirname;

/** @type {puppeteer.Browser} */
let browser;
/** @type {puppeteer.Page} */
let page;

describe("Test", () => {
  before(async () =>
  {
    browser = await puppeteer.launch({headless: false, args: ['--no-sandbox']});
  });

  it("Demo test for the puppeteer", async() =>
  {
    page = await browser.newPage();
    await page.goto("https://example.com/");
    const title = await page.title();
    assert.equal(title, "Example Domain1");
  });

  afterEach(async function() {
    if (this.currentTest.state === "failed") {
      const content = await page.content();
      const filePath = `./failedTests/${this.currentTest.fullTitle()}.html`;
      await fs.mkdir(getDirName(filePath));
      await fs.writeFile(filePath, content);
    }
  });

  after(async () =>
  {
    await browser.close();
  })
});
