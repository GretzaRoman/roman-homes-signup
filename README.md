# Roman Homes & Loans — Sign-Up Page

A single-page lead capture form for Gretza Roman (Realtor + Loan Officer). Collects contact info and buyer/realtor intent, saves every submission to a Google Sheet, then redirects the visitor to romanhomesandloans.com.

## Files

- `index.html` — the sign-up page (self-contained, no build step)
- `Code.gs` — Google Apps Script backend that writes submissions into a Google Sheet
- `qr.html` — generates a scannable QR code that links to the live sign-up page
- `README.md` — this file

## 1. Connect the Google Sheet backend

Submissions are wired to write into this specific spreadsheet:
[Roman Homes & Loans — Signups](https://docs.google.com/spreadsheets/d/1dKB-Eu9xi1Vo-0-Djo7csRJSZ4L4liCGn1YApyJSwe0/edit?gid=0#gid=0)

1. Open that Google Sheet.
2. Go to **Extensions > Apps Script**.
3. Delete the placeholder code and paste in the full contents of `Code.gs` from this repo.
4. Save (Ctrl+S).
5. Click **Deploy > New deployment**.
   - Click the gear icon next to "Select type" and choose **Web app**.
   - Description: "Signup form handler" (or anything).
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy**, authorize the permissions Google asks for, and copy the **Web app URL** it gives you (ends in `/exec`).
7. Open `index.html` in this repo and find this line near the bottom:
   ```js
   var SCRIPT_URL = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```
   Replace the placeholder with the URL you copied.

Every submission appends as a new row in whichever sheet tab is currently active in that spreadsheet, with the visitor's timestamp, name, phone, email, buyer/realtor status, timeline, and referral source.

> **If you ever edit `Code.gs` again:** saving the file alone does **not** update the live endpoint. You must go to **Deploy > Manage deployments**, edit the existing Web app deployment, set the version to "New version," and deploy again — or create a fresh deployment and update `SCRIPT_URL` to match its new `/exec` link.

## 2. Host it on GitHub Pages

1. Create a new GitHub repository (e.g. `roman-homes-signup`). It can be public or private (Pages works with private repos too, on paid plans — public is simplest and free).
2. Push these files to the repo:
   ```bash
   cd roman-homes-signup
   git init
   git add index.html qr.html Code.gs README.md
   git commit -m "Add Roman Homes & Loans sign-up page"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/roman-homes-signup.git
   git push -u origin main
   ```
3. On GitHub, go to the repo's **Settings > Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch", branch `main`, folder `/ (root)`. Save.
5. GitHub will give you a live URL, typically:
   ```
   https://YOUR_USERNAME.github.io/roman-homes-signup/
   ```
   It can take a minute or two to go live the first time.

### Optional: point a custom domain at it

If you want the form on a subdomain (e.g. `start.romanhomesandloans.com`) instead of the github.io URL, add a `CNAME` record at your DNS provider pointing to `YOUR_USERNAME.github.io`, then set the custom domain in the same Pages settings screen.

## 3. Generate the QR code

1. Once the page is live, open `qr.html` (either locally or at `https://YOUR_USERNAME.github.io/roman-homes-signup/qr.html`).
2. It auto-fills the sign-up page URL. Confirm it's correct.
3. Click **Download QR Code (PNG)** to save a print-ready image — use it on business cards, listing flyers, or open house signage.

## 4. Test it end-to-end

1. Open the live sign-up page.
2. Fill out the form and submit.
3. Confirm a new row appears in the Google Sheet.
4. Confirm you're redirected to `https://romanhomesandloans.com` after ~1.8 seconds.

## Notes

- The form works even before the Google Sheet is connected — it will just skip saving and go straight to the redirect, with a console warning. Connect Step 1 before sharing it publicly.
- All styling uses the existing Roman Homes & Loans palette (champagne gold `#C8A44E`, deep navy `#061224`, warm cream `#F8F5EF`) and fonts (Playfair Display + Outfit).
- No npm install, no build step — everything runs directly from static files, which is why it needs no server beyond GitHub Pages + the free Apps Script web app.
