# Ultimate AA — Tutor-Editable CMS Starter

This package keeps the current Ultimate AA public design but moves editable wording into JSON files under `content/`. The `/admin/` page is powered by Decap CMS.

## Why this version uses GitHub authentication

Netlify's Git Gateway is deprecated, so this starter deliberately uses Decap CMS's direct GitHub backend instead. The tutor will need a free GitHub account and collaborator access to the repository. They do **not** need to be a member of your Netlify team.

## One-time setup

1. GitHub repository: `Thatkidzaid/ultimate-aa` (already configured in `admin/config.yml`).
2. Add your tutor's GitHub account as a repository collaborator with write access.
3. In Netlify, connect the existing Ultimate AA site to this GitHub repository and use:
   - Build command: leave blank
   - Publish directory: `.`
4. Create a GitHub OAuth App:
   - Homepage URL: your Netlify site URL
   - Authorization callback URL: `https://api.netlify.com/auth/done`
5. In Netlify go to **Project configuration → Access & security → OAuth → Authentication providers** and install GitHub using that OAuth App's Client ID and Client Secret.
6. Visit `https://YOUR-SITE.netlify.app/admin/` and sign in with GitHub.

## Editing workflow

Tutor → `/admin/` → choose a section → edit text → **Publish**.

Decap commits the changed JSON file to GitHub. Netlify sees the commit and redeploys the same public URL automatically.

## Protected design

The tutor edits wording only. Layout, colours, cards, hamburger navigation, responsive styling, and print CSS stay in `index.html` and are not exposed as normal CMS fields.

## Current editable areas

- Adverb / Verb Combination
- Bonus Adverbs / Verbs
- Sentence Starters
- Words Like Highlight
- Introduction
- Shepherding
- Substantiating
- Mobilising, including both new strategies
- Conclusion
- 5 Steps of Analysis
- Next Level 5 Steps of Analysis
- All persuasive technique content

## Important

The public page contains the current content as a fallback, then loads the latest JSON content. If a content file fails to load, the current built-in text remains visible instead of showing a broken page.
