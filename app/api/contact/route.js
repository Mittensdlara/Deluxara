export async function POST(request) {
  try {
    const { name, email, company, message } = await request.json();

    if (!name || !email || !company || !message) {
      return Response.json({ error: 'All fields are required.' }, { status: 400 });
    }

    console.info('New consultation request', {
      name,
      email,
      company,
      message,
      receivedAt: new Date().toISOString()
    });

    return Response.json({
      success: true,
      message: 'Your consultation request has been received. Our atelier will respond shortly.'
    });
  } catch (error) {
    return Response.json({ error: 'Invalid request payload.' }, { status: 400 });
  }
}

export async function GET() {
  return Response.json({
    message: 'Submit a POST request to initiate a private consultation with Déluxara.'
  });
}
