# Clippy's Revenge

Clippy, the jealous AI paperclip, infiltrates corporate HQ to short-circuit all eight Copilot server racks.

**[Play the game](https://n8bar.github.io/ClippysRevenge/)**

Built with **Phaser 4.2.1**. The complete game (including its artwork and styling) is in `index.html`. No build step or external art assets required. Phaser itself loads from a CDN.

## Controls

- **A / D** or **Left / Right**: move
- **W**, **Up** or **Space**: jump
- **J** or **X**: zap
- **P**: pause/resume
- **R**: restart
- **M**: mute/unmute

Zap all 8 racks, avoid or zap drones, and reach the green exit. You have 5 hearts.

## Development and publishing

- `main` is the development branch.
- `release` is the published GitHub Pages branch.

The workflow under `.github/workflows/pages.yml` deploys **only** the `release` branch. Changes to `main` do not publish automatically.

## Running locally

Open `index.html` in a browser with internet access, or serve the repository with `python -m http.server 8000`.

## Verification

Run `node --check` against the JavaScript source (inlined into `index.html`) before release; the game should also be tested interactively in a browser.
