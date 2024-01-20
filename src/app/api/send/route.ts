import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

import Template from "../../../components/pages/EmailTemplate/index";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, subject, message } = await request.json();

    if (!email || !subject || !message) {
      return NextResponse.json(
        {
          message: "Data missing",
        },
        {
          status: 400,
        },
      );
    }

    const data = await resend.emails.send({
      from: "Support <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL_ID!],
      subject: `Palettegram Support | ${subject}`,
      react: Template({ email, message }),
    });

    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error },
      {
        status: 400,
      },
    );
  }
}
