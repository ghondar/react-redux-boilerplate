import puppeteer from 'puppeteer'

test('Render page', async () => {
  let browser = await puppeteer.launch({
    headless: false
  })
  let page = await browser.newPage()

  await page.goto('http://localhost:3000')
  await page.waitForSelector('h1')

  const html = await page.$eval('h1', e => e.innerHTML)
  expect(html).toBe('Hola Mundo')

  browser.close()
}, 16000)
