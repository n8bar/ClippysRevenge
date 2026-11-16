const assert = require('node:assert/strict');
const path = require('node:path');
const { chromium } = require('playwright-core');

(async () => {
  const errors = [];
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 820 } });
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    const url = 'file://' + path.resolve(__dirname, '..', 'index.html');
    await page.goto(url, { waitUntil: 'load', timeout: 30000 });
    await page.waitForFunction(() => window.clippyGame?.scene?.getScene('Game')?.phase === 'intro');
    console.log('BROWSER ERRORS BEFORE GAME STATE:', errors);
    const state = await page.evaluate(() => {
      const scene = window.clippyGame.scene.getScene('Game');
      return { phase: scene.phase, texture: scene.player.texture.key, canvas: document.querySelector('#game canvas')?.width, racks: scene.racks.getChildren().length, drones: scene.drones.getChildren().length };
    });
    assert.equal(state.phase, 'intro');
    assert.equal(state.texture, 'clippy');
    assert.equal(state.racks, 8);
    assert.equal(state.drones, 4);
    assert.equal(state.canvas, 960);
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => window.clippyGame.scene.getScene('Game').phase === 'play');
    await page.screenshot({ path: 'smoke-game.png' });
    const before = await page.evaluate(() => window.clippyGame.scene.getScene('Game').player.x);
    await page.keyboard.down('d');
    await page.waitForTimeout(600);
    await page.keyboard.up('d');
    const after = await page.evaluate(() => window.clippyGame.scene.getScene('Game').player.x);
    assert(after > before + 30, `Movement failed: x ${before} -> ${after}`);
    await page.evaluate(() => {
      const s = window.clippyGame.scene.getScene('Game');
      s.player.setPosition(215, 426);
      s.player.setVelocity(0, 0);
    });
    await page.keyboard.press('j');
    await page.waitForFunction(() => window.clippyGame.scene.getScene('Game').destroyed >= 1, null, { timeout: 5000 });
    assert.deepEqual(errors, [], 'Browser console errors');
    console.log('PASS browser: render, Clippy, eight racks, four drones, start, movement, and electric attack.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
