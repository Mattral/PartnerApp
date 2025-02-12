import { useEffect, useState } from 'react';
import axios from 'axios';

// Define the type for each dossier
type Dossier = {
  vd_code: string;
  vd_status: string;
  ed_code: string;
  ui_code:string;
  ed_name:string;
};

type DossierData = {
  count: number;
  dossiers: Dossier[];
  dossierList: Array<{ vd_code: string, vd_status: string, ed_code:string,ui_code:string ,ed_name:string}>; // Add the new array structure
};

const DossierCountAdv = ({ setDossierData }: { setDossierData: (data: DossierData) => void }) => {
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
          const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL  ;  // `${baseUrl}/`

          const response = await axios.get(`${baseUrl}/api/back-office/partner/manual-advisor-voi/dossiers/`, {
            headers: {
              'Authorization': `Bearer ${authToken}`, // Use the token retrieved from localStorage
              'COMPANY-CODE': process.env.NEXT_PUBLIC_COMPANY_CODE || "error no company code from ENV",
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
                ed_code: dossier.ed_code,
                vd_status: dossier.vd_status,
                ui_code: dossier.ui_code,
                ed_name: dossier.ed_name,
              })),
              dossierList: retrievedDossiers.map((dossier: any) => ({
                vd_code: dossier.vd_code,
                ed_code: dossier.ed_code,
                vd_status: dossier.vd_status,
                ui_code: dossier.ui_code,
                ed_name: dossier.ed_name,
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

export default DossierCountAdv;
