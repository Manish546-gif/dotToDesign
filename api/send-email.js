import { Resend } from "resend";

const formLabels = {
  "project brief": "Project brief",
  "discovery call request": "Discovery call request",
  "newsletter signup": "Newsletter signup",
};

const readText = (value, limit) =>
  typeof value === "string" ? value.trim().slice(0, limit) : "";

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.RESEND_TO_EMAIL;
  if (!apiKey || !from || !to) {
    return response.status(503).json({ error: "Email sending is not configured." });
  }

  const payload = request.body;
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return response.status(400).json({ error: "Invalid request." });
  }

  const formType = readText(payload.formType, 60).toLowerCase();
  const formLabel = formLabels[formType];
  const name = readText(payload.name, 120);
  const email = readText(payload.email, 254);
  const brand = readText(payload.brand, 200);
  const engagement = readText(payload.engagement, 120);
  const message = readText(payload.message, 5000);

  if (!formLabel || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return response.status(400).json({ error: "Enter a valid email address." });
  }
  if (formType === "project brief" && (!name || !message)) {
    return response.status(400).json({ error: "Name and project details are required." });
  }

  const fields = [
    ["Name", name],
    ["Email", email],
    ["Company / brand", brand],
    ["Engagement", engagement],
    ["Message", message],
  ].filter(([, value]) => value);

  const text = [
    `New ${formLabel.toLowerCase()} from dot-todesign.com`,
    "",
    ...fields.map(([label, value]) => `${label}:\n${value}`),
  ].join("\n\n");
  const html = [
    `<h1>New ${escapeHtml(formLabel.toLowerCase())} from dot-todesign.com</h1>`,
    "<dl>",
    ...fields.map(
      ([label, value]) =>
        `<dt><strong>${escapeHtml(label)}</strong></dt><dd style="white-space:pre-wrap">${escapeHtml(value)}</dd>`,
    ),
    "</dl>",
  ].join("");

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `${formLabel}: ${name || email}`,
      text,
      html,
    });

    if (error) {
      console.error("[Resend] Email send failed:", error.message);
      return response.status(502).json({ error: "Email could not be sent." });
    }

    return response.status(200).json({ success: true, id: data?.id });
  } catch (error) {
    console.error("[Resend] Email request failed:", error?.message || "Unknown error");
    return response.status(502).json({ error: "Email could not be sent." });
  }
}
