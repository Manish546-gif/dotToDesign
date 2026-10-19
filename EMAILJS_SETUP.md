# EmailJS setup

All site forms use one EmailJS service and template:

- Project brief on `/contact`
- Discovery call request on the homepage
- Newsletter signup on `/journal`

1. In EmailJS, connect the inbox that should receive website messages (currently `hello@dot-todesign.com`).
2. Create one email template. Set its recipient to that inbox and use these template variables:

   - `{{form_type}}` — identifies the form
   - `{{name}}`, `{{email}}`, `{{reply_to}}`, `{{brand}}`, `{{engagement}}`, `{{message}}`

   Set Reply-To to `{{reply_to}}`. The brand, engagement, and message variables are blank for forms that do not collect them.
3. Copy `.env.example` to `.env.local` and fill in the service ID, template ID, and public key from EmailJS. These are public client-side values; do not put a private key in the frontend.
4. Restart the Vite dev server or rebuild/redeploy after changing the environment values.

The form reports success only when EmailJS accepts the submission. If credentials are missing or delivery fails, the visitor sees a retry message and their form values are kept.
