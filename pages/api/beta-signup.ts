import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

type Data = { ok: true } | { ok: false; error: string };

// Hardcoded valid invite codes — get yours from the Telegram group
const VALID_CODES = ["POKE2024", "BETA001", "PIXEL99", "SOL2025", "POKEBETA"];

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { name, email, inviteCode } = req.body ?? {};

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({ ok: false, error: "Please enter your name." });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ ok: false, error: "Invalid email address." });
  }

  if (!inviteCode || !VALID_CODES.includes(inviteCode.trim().toUpperCase())) {
    return res.status(400).json({ ok: false, error: "Invalid invite code. Get yours from the Telegram group." });
  }

  const resend = new Resend('re_UpuGuQ2e_NKK7hStGA9QSGwTvP72mN66V');

  try {
    // Notify admin
    await resend.emails.send({
      from: "PokéPixel <onboarding@resend.dev>",
      to: ["pokepixeloffical@gmail.com"],
      replyTo: email.trim(),
      subject: "🎮 New Beta Signup!",
      html: `
        <div style="font-family:monospace;background:#0c0f0c;color:#39ff14;padding:32px;border-radius:12px;max-width:480px">
          <h2 style="color:#39ff14;margin:0 0 16px">New Beta Signup</h2>
          <p style="color:#8aaa8a;margin:0 0 8px">Name:</p>
          <p style="background:#1a2e1a;padding:10px 14px;border-radius:6px;color:#fff;margin:0 0 12px">${name.trim()}</p>
          <p style="color:#8aaa8a;margin:0 0 8px">Email:</p>
          <p style="background:#1a2e1a;padding:10px 14px;border-radius:6px;color:#fff;margin:0 0 12px">${email.trim()}</p>
          <p style="color:#8aaa8a;margin:0 0 8px">Invite Code:</p>
          <p style="background:#1a2e1a;padding:10px 14px;border-radius:6px;color:#39ff14;margin:0 0 16px">${inviteCode.trim().toUpperCase()}</p>
          <p style="color:#4a7a4a;font-size:12px;margin:0">PokéPixel — Play. Earn. Own.</p>
        </div>
      `,
    });

    // Confirmation to user
    await resend.emails.send({
      from: "PokéPixel <onboarding@resend.dev>",
      to: [email.trim()],
      subject: "🎮 Beta Access Confirmed — PokéPixel",
      html: `
        <div style="font-family:monospace;background:#0c0f0c;color:#39ff14;padding:32px;border-radius:12px;max-width:480px">
          <h2 style="color:#39ff14;margin:0 0 8px">Welcome, ${name.trim()}!</h2>
          <p style="color:#8aaa8a;margin:0 0 16px">Your beta access has been confirmed. You can now play PokéPixel BetaV1.</p>
          <a href="https://pokepixel.xyz/game" style="display:inline-block;background:#39ff14;color:#000;padding:12px 24px;border-radius:4px;text-decoration:none;font-weight:bold;margin-bottom:16px">▶ ENTER GAME</a>
          <p style="color:#4a7a4a;font-size:12px;margin:16px 0 0">PokéPixel — Play. Earn. Own.</p>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err?.message ?? "Failed to send email." });
  }
}
