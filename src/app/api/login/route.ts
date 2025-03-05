import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // Your API base URL
  const companyCode = process.env.NEXT_PUBLIC_COMPANY_CODE; // Company code from environment variables
  
  try {
    // Prepare the form data as we would have done in the original axios call
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);

    const config = {
      method: 'post',
      url: `${baseUrl}/api/auth/partner/login`,
      headers: {
        'COMPANY-CODE': companyCode || 'error no company code from ENV',
        'FRONTEND-KEY': 'XXX', // Replace with actual frontend key if needed
      },
      data: data,
    };

    // Make the API call to the login endpoint
    const response = await axios(config);

    if (response.status === 200 && response.data.status === 'treatmentSuccess') {
      return NextResponse.json(response.data, { status: 200 });
    } else {
      // Extract the message from the API response in case of failure
      const errorMessage = response.data?.data?.primaryData?.msg || 'Login failed';
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
  } catch (error: any) {
    // Check if error has a response object (error from the API)
    if (error.response) {
      const errorMessage = error.response.data?.data?.primaryData?.msg || 'An error occurred during login';
      return NextResponse.json({ error: errorMessage }, { status: error.response.status || 500 });
    }

    // If the error is something else (e.g., network error)
    return NextResponse.json({ error: error.message || 'An unexpected error occurred during login' }, { status: 500 });
  }
}


/*

    // Make the API call to the login endpoint
    const response = await axios(config);

    if (response.status === 200 && response.data.status === 'treatmentSuccess') {
      return NextResponse.json(response.data, { status: 200 });
    } else {
      return NextResponse.json({ error: response.data.message || 'Login failed' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'An unexpected error occurred during login' }, { status: 500 });
  }
}

*/