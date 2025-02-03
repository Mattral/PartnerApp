"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

const AdvisorList = () => {
  const [advisors, setAdvisors] = useState<any>(null); // State to store API response
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lawonearth.co.uk';  // `${baseUrl}/`

        const url = `${baseUrl}/api/partner/advisors?searchKey=`;

        const payload = {
          ed_codes: "",
          min_price: "",
          max_price: "",
          min_rating: "",
          max_rating: "",
          ui_levels: ['advisor'],
        };

        const headers = {
          'COMPANY-CODE': 'MC-H3HBRZU6ZK5744S',
          'FRONTEND-KEY': 'XXX',  // Replace with your actual FRONTEND-KEY
          'PaginateResults': '1',
          'MaxResultsPerPage': '12',
          'X-Requested-With': 'XMLHttpRequest',
        };

        // Make the API POST request using axios
        const response = await axios.post(url, payload, { headers });

        if (response.status === 200) {
          setAdvisors(response.data); // Set the response data to state
        } else {
          setError('Request failed');
        }
      } catch (error) {
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchAdvisors();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>API Response (JSON format)</h1>
      <pre>{JSON.stringify(advisors, null, 2)}</pre> {/* Display the API response as formatted JSON */}
    </div>
  );
};

export default AdvisorList;
