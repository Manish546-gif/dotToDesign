# Resend setup

The contact brief, discovery request, and newsletter signup forms send notifications to
`dottodesign.d2d@gmail.com` through the Vercel function at `/api/send-email`. The newsletter form
currently emails the signup notification to this inbox; it does not add subscribers to a Resend
audience.

## Required account setup

1. Add and verify a sending domain in Resend. The suggested sender is
   `DotToDesign <hello@mail.dot-todesign.com>`; the domain must be verified before live sending.
2. Add Resend's DNS records at the domain's DNS provider.
3. Create a sending-only API key restricted to the verified domain.
4. Set these environment variables for local development and in the Vercel project:

   - `RESEND_API_KEY` — the sending-only key
   - `RESEND_FROM_EMAIL` — for example `DotToDesign <hello@mail.dot-todesign.com>`
   - `RESEND_TO_EMAIL` — `dottodesign.d2d@gmail.com`

The API key is read only by the serverless function and must never use a `VITE_` prefix.
For local use of the `/api` function, run `vercel dev`; the Vite dev server alone does not run the
serverless function.
