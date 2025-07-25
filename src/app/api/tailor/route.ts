import { NextResponse } from 'next/server';

const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_AI_WEBHOOK_URL;

export async function POST(request: Request) {
  try {
    if (!N8N_WEBHOOK_URL) {
      return NextResponse.json(
        { error: 'N8N webhook URL is not configured' },
        { status: 500 }
      );
    }

    // Log the webhook URL we're using (without sensitive parts)
    console.log('Using webhook URL:', N8N_WEBHOOK_URL.split('/').slice(-2).join('/'));

    // Get the form data from the request
    const formData = await request.formData();
    
    // Forward the request to n8n
    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text();
      console.error('N8N webhook error response:', errorText);
      
      return NextResponse.json(
        { error: errorText },
        { status: n8nResponse.status }
      );
    }

    const data = await n8nResponse.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error in tailor API route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
} 