import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: any) {
  // Getting data from the form
  const daata = await request.json();
  const { email, message } = daata;

  try {
    const data = await resend.emails.send({
      from: "Palettegram <onboarding@resend.dev>",
      to: `${process.env.CONTACT_EMAIL_ID}`,
      subject: "Contact Form",
      text: message as string,
      reply_to: email,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
