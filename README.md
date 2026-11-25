# Lueh Yi Hong — Portfolio

Website: https://caleblueh.github.io/portfolio/

This repository is the editable source for the public portfolio. The current
release includes C++ Snake Game, Tic Tac Toe, OpenGL Space Shooter and the
itch.io-hosted RollerBall360, YunYun Number Wizard, Pixel Adventure, The Assignment, Floor is Lava and Defender of Independence Remake players. Other Unity pages are placeholders
until their itch.io players are connected.
Visual Production is intentionally empty for now.

## Updating with GitHub Desktop

1. Fetch origin and pull any incoming changes before editing.
2. Edit the website files inside `site/`.
3. Run `Start Preview.cmd` and check the changed pages locally.
4. In GitHub Desktop, review the changes and commit them to `main`.
5. Click **Push origin**. The **Publish portfolio** GitHub Actions workflow
   publishes `site/` automatically. Wait for a green workflow, then refresh the
   public website. A local edit or commit alone does not publish it.

The public address stays the same when files are updated in this repository.
The laptop does not need to remain online after the deployment completes.

## Where to edit

| File/folder | Purpose |
|---|---|
| `site/settings.js` | Homepage introduction, colours, spacing and composition settings |
| `site/site.css` | Website layout and styling |
| `site/site-data.js` | Project descriptions, controls and player destinations |
| `site/site.js` | Navigation and page rendering |
| `site/assets/cover.png` | Homepage artwork |
| `site/assets/resume-en.pdf`, `resume-zh.pdf` | Published resumes |
| `site/games/` | The three published browser games and their shared files |
| `.github/workflows/pages.yml` | Automatic publishing on pushes to `main` |
| `tools/preview.py` | Local-only preview server; not deployed |

Only `site/` is deployed as the website. All committed repository files are
public, so do not add private documents, credentials, backups or raw Unity
projects to this repository.

The older full local portfolio and raw Unity projects remain separate. Editing
that older workspace does not automatically change this repository. Make future
public website changes here. If using the older visual editor, export its
settings and deliberately replace `site/settings.js`, then preview and push.

Unity game updates will be built and uploaded to their respective itch.io
projects. Their verified embed destinations will be recorded in `site-data.js`.
Updating an itch.io upload with a new embed ID also requires updating that entry
and pushing the portfolio. Do not copy large Unity Web exports into `site/`.

## Preview

Double-click `Start Preview.cmd`, or run `python tools/preview.py` from the
repository root. Python 3 is needed; the Windows launcher also supports the
installed Codex Python runtime. Stop the preview server with Ctrl+C.

## Hosting

GitHub Pages uses **GitHub Actions** as its source. The workflow uploads only
`site/`, with no dependency installation or website build step required.

Documentation:
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https

No external assets or libraries were downloaded for this deployment. Existing
browser game artwork/audio and resumes were copied from the user's tested local
portfolio. This repository does not grant third-party asset reuse rights.

## RollerBall360 on itch.io

Game page: https://caleb-lueh.itch.io/rollerball360

The portfolio loads the supported Game Embed iframe from itch.io. The Unity
files stay on itch.io and are not stored in this repository. The actual game
canvas stays 9:16, with extra space for its toolbar, controls note and itch.io
footer. Desktop keyboard/mouse and the touch Pad remain available. A physical
phone check is still required before claiming device-specific compatibility.

For game changes, rebuild Unity Web and update the existing itch.io project.
Verify the embed URL after replacing the upload. If the upload ID changes,
update RollerBall360 playUrl in site/site-data.js and push this repository.
Website text/layout changes only need the normal GitHub Desktop commit/push.
No Unity rebuild is needed for those changes.

## YunYun Number Wizard on itch.io

Game page: https://caleb-lueh.itch.io/yunyun-number-wizard

The tutorial uses the supported Game Embed from itch.io (upload 20797350).
The canvas stays 16:9; the complete player also includes its toolbar, note and
itch.io footer. It intentionally has no audio. Raw Unity source is not stored
in this repository. Update the existing itch.io project for game rebuilds,
verify its embed ID, and update site/site-data.js if that ID changes.

## What repository edits change

Everything committed here is public. site/ contains the deployed HTML, CSS,
JavaScript and public assets. Editing those files and pushing main updates the
website. Changes to files outside site/ are not website content, although the
Pages workflow controls publication. Local edits alone are not published.
The three C++ games are browser adaptations with readable JavaScript; their
original Visual Studio projects are separate. Unity Web files are compiled
code and assets hosted on itch.io; they are downloadable by a browser and are
not a way to keep all shipped game logic or assets secret.

RollerBall360 alone has motionSensors enabled in site-data.js. The website
delegates accelerometer/gyroscope access to its itch.io frames. The Android
Chrome tilt issue remains unresolved after the permission correction and is left for later at the user's request. Native Android and
Web builds use different sensor paths.

## Pixel Adventure on itch.io

Game page: https://caleb-lueh.itch.io/pixel-adventure

The supported Game Embed uses upload 20810157, with the offered 1280 by 740
iframe dimensions. The game canvas remains 16:9 inside the responsive player.
This game is intended for desktop keyboard and mouse; mobile support is off.
The wrapper retains Mute, Fullscreen and Restart. The existing tested Web build
was packaged without raw Unity source or gameplay changes.

For a game update, rebuild Unity Web, replace the itch.io upload, verify the
offered Game Embed URL, and update site/site-data.js if its upload ID changes.

## How the hosting fits together

- Raw Unity project: editable scripts, scenes, assets and project settings on
  the author's computer. It is separate from this public repository.
- Unity Web build: compiled game code, assets and browser loader exported from
  Unity. This distributable build is uploaded to itch.io.
- GitHub repository: version history and editable portfolio HTML, CSS,
  JavaScript and public assets. GitHub Desktop synchronizes this repository.
- GitHub Actions: publishes site/ after a push to main.
- GitHub Pages: serves the published portfolio files over HTTPS.
- itch.io: serves the Unity Web builds. The portfolio opens a supported iframe
  player, so visitors stay on the portfolio while playing.
- Visitor's browser: fetches the site from Pages and the embedded build from
  itch.io, then runs the interface and gameplay on the visitor's own device.

Static hosting serves saved files. JavaScript and WebAssembly can still make
those files interactive. It does not provide a custom login database or a
dedicated multiplayer game server. The hosting platforms supply the servers;
the author's laptop does not need to stay online.

The current portfolio uses index.html plus JavaScript hash routes such as
#/games/pixel-adventure. To add a separate page, create site/about.html (for
example), preview, commit and push; it would appear at /portfolio/about.html.
Creating a file locally does not publish it until deployment completes.

Reference documentation (no external artwork downloaded):
- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- https://itch.io/docs/creators/html5
- https://docs.unity.com/en-us/engine/6000.3/manual/platform-specific/webgl/building-distribution/building

## The Assignment on itch.io

Game page: https://caleb-lueh.itch.io/the-assignment

Supported Game Embed: https://itch.io/embed-upload/20811155?color=333333
The offered iframe is 1280 by 740; the actual game stays 16:9. Desktop keyboard
and mouse are required. The existing tested build includes StreamingAssets
menu-background and credits MP4 files. No raw Unity source was published and
no gameplay changes or Unity rebuild were needed for this publication.

## Hold Escape to exit fullscreen

The shared site/fullscreen.js runs in the outer portfolio document. All game
pages provide a portfolio Fullscreen button above the player. Where supported
and permitted, the controller reserves only Escape using Keyboard Lock, so a
short press reaches the game and the browser's roughly two-second Escape hold
exits fullscreen. The lock is released when fullscreen ends or the page closes.
Existing game fullscreen buttons are also covered while embedded here.

Keyboard Lock requires browser support, a secure context (HTTPS or localhost),
and browser permission where requested. If unavailable or denied, the page
reports that the normal single-Escape browser exit remains active. A web page
cannot override this browser safety behavior with preventDefault alone.
The direct itch.io page is controlled by itch.io, so use the portfolio for this
shared behavior. F11 fullscreen is a separate browser mode.

The local full portfolio has the same controller in dist/fullscreen.js,
including standalone local game pages and the visual editor's outer document.
The user confirmed short-Escape and long-Escape behavior across the currently
published games during the local preview check on 2026-11-25.

Reference: https://developer.chrome.com/docs/capabilities/web-apis/keyboard-lock

## Floor is Lava on itch.io

Game page: https://caleb-lueh.itch.io/floor-is-lava

Supported Game Embed: https://itch.io/embed-upload/20811710?color=333333
Offered iframe: 1280 by 740. The actual game canvas remains 16:9, intended for
desktop keyboard and mouse. First download is approximately 282 MB.

The tested split-data player is preserved. All four Unity payload hashes match
the local import and the provided Web export; no Unity rebuild or source changes
were made. Existing pointer-lock denial handling and repaired lighting remain
in the shipped runtime. The player retains Credits and the identified CC BY 4.0
model attribution. No raw Unity source or large build files are in this repo.

To update gameplay, rebuild Unity Web and update this itch.io project. Verify
the offered embed URL afterward; if the upload ID changes, update playUrl here
and push the portfolio. The shared portfolio hold-Escape fullscreen controller
also covers this game; direct itch.io fullscreen is controlled by itch.io.

## Defender of Independence Remake on itch.io

Game page: https://caleb-lueh.itch.io/defender-of-independence-remake

Supported Game Embed: https://itch.io/embed-upload/20812372?color=333333
Offered iframe: 1280 by 740. Actual game canvas: 16:9.
Desktop keyboard and mouse required; first download is approximately 472 MB.

The tested split-data loader, mouse-capture denial handling, audio/video mute
support and credits MP4 are retained. The package payload and video hashes
match the tested local build and source Web export. No raw Unity source,
gameplay changes or rebuild were needed for publication. Large game files
remain on itch.io. The shared portfolio hold-Escape controller covers this game.

For later gameplay updates, rebuild and update the itch.io project, verify its
offered Game Embed URL, and update playUrl here if the upload ID changes.
