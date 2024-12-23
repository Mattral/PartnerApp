import { useEffect, useState } from 'react';
import axios from 'axios';

// Define the type for each dossier
type Dossier = {
  vd_code: string;
  vd_status: string;
};

type DossierData = {
  count: number;
  dossiers: Dossier[];
  dossierList: Array<{ vd_code: string, vd_status: string }>; // Add the new array structure
};

const DossierCount = ({ setDossierData }: { setDossierData: (data: DossierData) => void }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  // Fetch authorization token from localStorage
  useEffect(() => {
    const storedAuthData = localStorage.getItem('authData');
    if (storedAuthData) {
      try {
        const parsedData = JSON.parse(storedAuthData);
        const token = parsedData?.data?.primaryData?.authorization;
        if (token) {
          setAuthToken(token); // Store the token in the state
        } else {
          setError('Authorization token not found');
        }
      } catch (error) {
        console.error('Failed to parse auth data:', error);
        setError('Failed to retrieve authorization token');
      }
    } else {
      setError('No authentication data found in localStorage');
    }
  }, []);

  // Fetch the dossiers data
  useEffect(() => {
    if (authToken) {
      const fetchDossiers = async () => {
        try {
          const response = await axios.get('https://lawonearth.co.uk/api/back-office/partner/manual-client-voi/dossiers/', {
            headers: {
              'Authorization': `Bearer ${authToken}`, // Use the token retrieved from localStorage
              'COMPANY-CODE': 'MC-H3HBRZU6ZK5744S',
              'FRONTEND-KEY': 'XXX', // Replace with actual frontend key
              'PaginateResults': '1',
              'MaxResultsPerPage': '12',
              'X-Requested-With': 'XMLHttpRequest',
            },
          });

          if (response.data.status === 'treatmentSuccess') {
            const retrievedDossiers = response.data.data.primaryData._dossiers.data;
            const dossierData = {
              count: retrievedDossiers.length,
              dossiers: retrievedDossiers.map((dossier: any) => ({
                vd_code: dossier.vd_code,
                vd_status: dossier.vd_status,
              })),
              dossierList: retrievedDossiers.map((dossier: any) => ({
                vd_code: dossier.vd_code,
                vd_status: dossier.vd_status,
              })),
            };
            setDossierData(dossierData);
          } else {
            setError('Failed to retrieve dossiers');
          }
        } catch (error) {
          setError('Error fetching dossiers');
        } finally {
          setLoading(false);
        }
      };

      fetchDossiers();
    }
  }, [authToken, setDossierData]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return null; // This component does not render any UI itself, it just sets the data
};

export default DossierCount;
