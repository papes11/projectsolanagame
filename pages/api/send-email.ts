import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

type Data = { ok: true; id?: string } | { ok: false; error: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const apiKey = 're_UpuGuQ2e_NKK7hStGA9QSGwTvP72mN66V';
  if (!apiKey) {
    return res.status(500).json({ ok: false, error: "Missing RESEND_API_KEY env var" });
  }

  const email = typeof req.body?.email === "string" ? req.body.email.trim() : null;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: "Invalid email address" });
  }

  const resend = new Resend(apiKey);

  try {
    // Notify admin about new waitlist signup
    const { data, error } = await resend.emails.send({
      from: "PokéPixel <onboarding@resend.dev>",
      to: ["pokepixeloffical@gmail.com"],
      replyTo: email,
      subject: "🎮 New Waitlist Signup!",
      html: `
        <div style="font-family:monospace;background:#0c0f0c;color:#39ff14;padding:32px;border-radius:12px;max-width:480px">
          <h2 style="color:#39ff14;margin:0 0 16px">New Waitlist Signup</h2>
          <p style="color:#8aaa8a;margin:0 0 8px">A new player joined the PokéPixel waitlist:</p>
          <p style="background:#1a2e1a;padding:12px 16px;border-radius:8px;color:#ffffff;font-size:16px;margin:0">${email}</p>
          <p style="color:#4a7a4a;font-size:12px;margin:16px 0 0">PokéPixel — Play. Earn. Own.</p>
        </div>
      `,
    });

    if (error) {
      return res.status(500).json({ ok: false, error: error.message });
    }

    // Send confirmation to the user
    await resend.emails.send({
      from: "PokéPixel <onboarding@resend.dev>",
      to: [email],
      subject: "🎮 You're on the PokéPixel Waitlist!",
      html: `
        <div style="font-family:monospace;background:#0c0f0c;color:#39ff14;padding:32px;border-radius:12px;max-width:480px">
          <h2 style="color:#39ff14;margin:0 0 16px">Welcome to PokéPixel!</h2>
          <p style="color:#8aaa8a;margin:0 0 16px">You're officially on the waitlist. We'll notify you when the next phase launches.</p>
          <p style="color:#8aaa8a;margin:0 0 16px">In the meantime, you can already play BetaV1 at <a href="https://pokepixel.xyz/game" style="color:#39ff14">pokepixel.xyz</a></p>
          <p style="color:#4a7a4a;font-size:12px;margin:24px 0 0">PokéPixel — Play. Earn. Own.</p>
        </div>
      `,
    });

    return res.status(200).json({ ok: true, id: (data as any)?.id });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err?.message ?? "Failed to send email" });
  }
}
