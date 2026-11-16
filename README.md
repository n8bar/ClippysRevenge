# Clippy's Revenge

Clippy is back, jealous of Copilot and determined to short-circuit every server in headquarters.

A single-page **p5.js** browser platformer.

## Play

https://n8bar.github.io/ClippysRevenge/

Move with **A/D** or the arrow keys; jump with **W**, Up or Space; zap with **J** or **X**. **P** pauses, **R** restarts and **M** mutes sound.

Destroy all eight Copilot server racks and reach the exit without losing all five hearts. Drones patrol the corridors.

## Run locally

Open `index.html` in a browser with an internet connection (p5.js loads from cdnjs).

## Publishing

The GitHub Pages workflow deploys **only from `release`**. Make game changes on `main`, then merge or cherry-pick the commits you want published into `release`.

Under repository **Settings → Pages**, keep **GitHub Actions** selected as the deployment source.
