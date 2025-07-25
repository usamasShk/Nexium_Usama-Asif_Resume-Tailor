interface N8nResponse {
  response: string;
}

export async function sendToN8nWebhook(pdfFile: File, jobDescription: string) {
  try {
    // Validate inputs
    if (!pdfFile || !jobDescription) {
      throw new Error('PDF file and job description are required');
    }

    console.log('Sending request with:', {
      fileType: pdfFile.type,
      fileName: pdfFile.name,
      fileSize: pdfFile.size,
      jobDescriptionLength: jobDescription.length
    });

    // Create form data
    const formData = new FormData();
    formData.append('data', pdfFile);
    formData.append('job_description', jobDescription.trim());

    const response = await fetch('/api/tailor', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error:', {
        status: response.status,
        statusText: response.statusText,
        responseText: errorText
      });
      throw new Error(`API error! status: ${response.status}, details: ${errorText}`);
    }

    const data = await response.json();
    console.log('API response:', data);

    // Handle both array and single object response formats
    const responseText = Array.isArray(data) ? data[0]?.response : data?.response;

    if (!responseText) {
      console.error('Invalid response format:', data);
      throw new Error('Invalid response format from API');
    }

    return {
      formattedText: responseText
    };

  } catch (error: unknown) {
    console.error('Error in sendToN8nWebhook:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to process with n8n: ${error.message}`);
    } else {
      throw new Error('Failed to process with n8n: Unknown error occurred');
    }
  }
} 