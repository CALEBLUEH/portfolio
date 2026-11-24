# Lueh Yi Hong — Portfolio

Website: https://caleblueh.github.io/portfolio/

This repository is the editable source for the public portfolio. The current
release includes C++ Snake Game, Tic Tac Toe, OpenGL Space Shooter and the
itch.io-hosted RollerBall360 player. Other Unity project pages are placeholders
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
