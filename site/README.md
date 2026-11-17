# Kofix Photography Studio website

Plain HTML/CSS/JS (no frameworks, no dashboard). Works offline after the first visit (PWA).

## Add photos, videos and frames
Put the file in the right folder, then deploy. The category comes from the folder.

| What | Folder | Notes |
|---|---|---|
| Photos | `media/photos/<category>/` | `weddings`, `birthdays`, `maternity-baby`, `graduation`, `portraits`, `events`. A new folder name creates a new category. Use .webp or .jpg, about 900 px wide. |
| Videos | `media/videos/<category>/` | `wedding` = Wedding Videos, `bts` = BTS Videos, `celebrations`, `promo`. Use .mp4 (H.264), 720p. A poster image with the same name (`name.jpg`) is used as the thumbnail. |
| Picture frames | `media/frames/` | Any number of images. |

**Wrong category?** Move the file to the other folder. File names become the captions (`bride-and-groom.webp` becomes "Bride and groom").

`media.js` is rebuilt automatically on every Netlify deploy by `node tools/scan-media.js`. To rebuild it yourself, run that command in this folder.

## Deploy to Netlify
- **Easiest:** log in to Netlify, Sites, "Add new site", "Deploy manually", drag this whole folder in. (`media.js` is already built.)
- **With Git:** push this folder to GitHub, then "Import from Git" in Netlify. `netlify.toml` already sets the build command and headers.
- After adding files later, redeploy (drag the folder again, or push to Git).

## Test the published site
1. Open the site on a phone and a computer. Check the menu, Portfolio filters, Videos and Frames.
2. Music: it starts by itself only if the browser allows it. Otherwise it starts on your first tap, click or key press. Phones may need a tap first.
3. Offline: open the site once online, wait a few seconds, then switch on airplane mode and reload. The page, logo, music and photos you already viewed should open, with an offline notice. Videos need internet.
4. Install: in Chrome use "Install app" or "Add to Home Screen".
5. After changing files, edit `const V='kofix-v1'` in `sw.js` (for example to `kofix-v2`) so visitors get the update.

## Music
`assets/kofix-ambient.mp3` is an original instrumental generated for this site, so there are no licence issues. To use another track, replace that file with an instrumental you own or have licensed.

## Testimonials, promo notice and photo ring
- **Testimonials:** open `testimonials.js` and add up to 4 real client quotes (name, what they booked, their words). The section stays hidden until you add at least one.
- **Promo notice:** dates and link are at the top of the promo block in `extras.js` (`PROMO`). It shows from Monday 9 November 2026 to the end of Monday 16 November 2026 (Ghana time), then disappears by itself.
- **Photo ring:** it uses the first photos from your public portfolio folders (`media/photos/...`), so adding photos there updates the ring.
