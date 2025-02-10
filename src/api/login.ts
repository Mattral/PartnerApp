import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // Use .env for your base URL
    console.log('NEXT_PUBLIC_API_BASE_URL is:', process.env.NEXT_PUBLIC_API_BASE_URL);

    try {
      // Prepare form data for the API request
      const data = new FormData();
      data.append('email', email);
      data.append('password', password);

      const config = {
        method: 'post',
        url: `${baseUrl}/api/auth/partner/login`,
        headers: {
          'COMPANY-CODE': process.env.NEXT_PUBLIC_COMPANY_CODE || "error no company code from ENV",
          'FRONTEND-KEY': 'XXX', // Customize this if needed
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      };

      // Make the API call to your partner API
      const response = await axios(config);

      console.log('Partner API response:', response.data);  // Log the response to the server

      // Check if the response is successful
      if (response.status === 200 && response.data.status === 'treatmentSuccess') {
        return res.status(200).json(response.data);
      } else {
        console.error('Partner API returned an error:', response.data);
        return res.status(400).json({ message: 'Login failed', error: response.data.message });
      }
    } catch (error: unknown) {  // Explicitly type the error as 'unknown'
      if (error instanceof Error) {  // Check if it's an instance of Error
        console.error('Error during login API call:', error.message);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
      } else {
        console.error('Unknown error:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: 'Unknown error occurred' });
      }
    }
  } else {
    console.error('Invalid method, expected POST');
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
