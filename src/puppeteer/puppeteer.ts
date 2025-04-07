import puppeteer, { Browser } from 'puppeteer';
import { setItalianLocale } from './utils/utils';

let browser: Browser | null = null;

export const launchBrowser = async () => {
  browser = await puppeteer.launch({
    headless: false,
    args: browserArgs,
    // executablePath: process.env.CHROME_BIN || undefined,
  });

  const page = await browser.newPage();

  await setItalianLocale(page);

  console.log('🚀 Puppeteer Setup Completed 👌');
};

export const getBrowser = async () => {
  if (!browser) {
    throw new Error('Browser not initialized');
  }

  return browser;
};

const browserArgs = [
  '--disable-site-isolation-trials',
  '--autoplay-policy=user-gesture-required',
  '--disable-background-networking',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-domain-reliability',
  '--disable-extensions',
  '--disable-features=AudioServiceOutOfProcess',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-popup-blocking',
  '--disable-print-preview',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-setuid-sandbox',
  '--disable-speech-api',
  '--disable-accelerated-2d-canvas',
  '--disable-sync',
  '--hide-scrollbars',
  '--ignore-gpu-blacklist',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-first-run',
  '--no-pings',
  '--no-sandbox',
  '--no-zygote',
  '--password-store=basic',
  '--use-gl=swiftshader',
  '--use-mock-keychain',
  // '--single-process', //? disabilitato dato che causa il crash di chrome
  '--disable-gpu',
  '--font-render-hinting=none',
  '--remote-debugging-port=9222',
  '--remote-debugging-address=0.0.0.0',
];
