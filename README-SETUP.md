# Kofix Photography Studio: website + Kofix AI (setup)

## What is in this folder
- `site/`  the public website (everything visitors see). Unchanged apart from the Kofix AI chat.
- `netlify/functions/`  the private backend: `chat` (Kofix AI), `portfolio` (serves the private photo library), `edit` (optional AI photo editing). Nothing here is publicly downloadable.
- `netlify.toml`  tells Netlify where everything is.

## Deploy (functions need Git or the CLI, not a plain drag-and-drop of `site/`)
**Option A: GitHub + Netlify (easiest to maintain)**
1. Create a GitHub repository and upload this whole folder (GitHub > Add file > Upload files).
2. Netlify > Add new site > Import an existing project > pick the repository. Leave the settings as detected (`netlify.toml` sets them). Deploy.

**Option B: Netlify CLI**
`npm install -g netlify-cli`, then `netlify login`, then `netlify deploy --prod` inside this folder.

**Drag-and-drop only:** `kofix-photography-studio-netlify.zip` is the website without the AI backend. The chat button still opens, but answers with a polite "unavailable" message and the WhatsApp link.

## Environment variables (Netlify > Site configuration > Environment variables)
| Name | Needed for | Required? |
|---|---|---|
| `ANTHROPIC_API_KEY` | Kofix AI answers and sample retrieval | Yes, for the AI chat |
| `OPENAI_API_KEY` | Customer photo editing with AI and concept images | Optional. Without it, only "Quick enhance" works |
| `KOFIX_AI_MODEL` | Change the chat model (default `claude-haiku-5-5`) | Optional |
Never put these keys in any file inside `site/`. Redeploy after adding them.

## Costs and limits
- Anthropic and OpenAI charge per use. Set a monthly spending limit in each account. Chat answers are short and use a small, fast model.
- Netlify limits how long a function may run (about 10 to 26 seconds depending on plan). AI photo edits can take longer and may time out. The chat then says so and produces nothing.
- Customer photos are sent to the editing service only when the customer asks for an AI edit, and are not stored by Kofix. The service's own retention rules apply. "Quick enhance" runs entirely in the customer's browser.
- The private photos are only reachable through the `portfolio` function, which serves a photo only when the AI selects it. Links are unguessable, but a customer who is shown a photo can still save or share it, as with any photo shown online.

## Add more photos to the private library
1. Make a folder `private-library/<category>/` on your computer (not inside `site/`), e.g. `weddings`, `birthdays`, `maternity-baby`, `graduation`, `portraits`, `events`, `frames`, `behind-the-scenes`. Put photos in the right folder (ask Claude to sort a batch by looking at the pictures first).
2. Name each file descriptively (it becomes the photo's description).
3. Run `pip install pillow` once, then `python3 tools/build-portfolio.py`, then redeploy.
Public website photos still go in `site/media/...` as before (see `site/README.md`).

## Test after deploying
Ask the AI: where are you located / show me your wedding pictures / show me birthday photoshoots / picture frame samples / traditional engagement samples (should say unavailable and offer WhatsApp) / how do I get prices / an unrelated question (should decline). Tap Listen on a reply. Open the chat and confirm the background music pauses. Attach a photo, use Quick enhance, check the "Kofix Photography Studio" footer, and download it. Try on a phone and a computer.
