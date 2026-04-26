import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form 🚀",
      html: `
        <h3>New Message</h3>
        <p><b>Name:</b> ${body.name}</p>
        <p><b>Phone:</b> ${body.phone}</p>
        <p><b>Email:</b> ${body.email}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ success: false });
  }
}