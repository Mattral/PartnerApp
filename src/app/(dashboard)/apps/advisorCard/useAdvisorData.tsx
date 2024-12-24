import { useEffect, useState } from 'react';
import axios from 'axios';

// Custom hook to fetch advisor data
export const useAdvisorData = (searchKey, min_price, max_price) => {
  const [advisors, setAdvisors] = useState<any[]>([]);

  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        // Modify the URL to include searchKey
        const url = `https://lawonearth.co.uk/api/partner/advisors?searchKey=${encodeURIComponent(searchKey || '')}`;

        // Define the payload for the POST request
        const payload = {
          ed_codes: '',
          min_price: min_price || '',  // Use the passed min_price or fallback to empty string
          max_price: max_price || '',  // Use the passed max_price or fallback to empty string
          min_rating: '',
          max_rating: '',
          ui_levels: ['advisor'],
        };

        // Set the headers for the API request
        const headers = {
          'COMPANY-CODE': 'MC-H3HBRZU6ZK5744S',  // Replace with actual COMPANY-CODE
          'FRONTEND-KEY': 'XXX',  // Replace with actual FRONTEND-KEY
          'PaginateResults': '1',
          'MaxResultsPerPage': '12',
          'X-Requested-With': 'XMLHttpRequest',
        };

        // Making the POST request to the API
        const response = await axios.post(url, payload, { headers });

        if (response.status === 200) {
          const data = response.data;
          const advisorsData = data.data.primaryData._advisors.data;

          // Extract and format the required advisor information
          const advisorsInfo = advisorsData.map((advisor: any) => ({
            pers_fName: advisor.pers_fName,
            pers_lName: advisor.pers_lName,
            email: advisor.email,
            pers_profilePic: advisor.pers_profilePic,
            pers_phone1: advisor.pers_phone1,
            pers_preferredTimezone: advisor.pers_preferredTimezone,
            pers_code: advisor.pers_code,
            ui_code: advisor.expertiseDomains[0]?.ui_code || '',
            ed_name: advisor.expertiseDomains[0]?.ed_name || 'N/A',
            pp_jobTitle: advisor.expertiseDomains[0]?.pp_jobTitle || '',
            pp_jobDesc: advisor.expertiseDomains[0]?.pp_jobDesc || ''
          }));

          // Store the formatted data in state
          setAdvisors(advisorsInfo);
        } else {
          console.error("Failed to fetch advisors: ", response.status);
        }
      } catch (error) {
        console.error("Error fetching advisor data: ", error);
      }
    };

    fetchAdvisors();  // Fetch the data when any of the params change

  }, [searchKey, min_price, max_price]); // Re-run the effect if any of these change

  return advisors;  // Return the fetched advisors data
};
