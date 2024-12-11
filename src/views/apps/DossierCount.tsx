// views/apps/DossierCount.tsx
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
};

const DossierCount = ({ setDossierData }: { setDossierData: (data: DossierData) => void }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDossiers = async () => {
      try {
        const response = await axios.get('https://lawonearth.co.uk/api/back-office/partner/manual-client-voi/dossiers/', {
          headers: {
            'Authorization': 'Bearer 520|VmpluNvqeBkZeuskfZF5fAv4ddlsaOazSePhk1Vlb1dd7630',
            'COMPANY-CODE': 'MC-H3HBRZU6ZK5744S',
            'FRONTEND-KEY': 'XXX', // Replace with actual frontend key
            'PaginateResults': '1',
            'MaxResultsPerPage': '12',
            'X-Requested-With': 'XMLHttpRequest',
          }
        });

        if (response.data.status === 'treatmentSuccess') {
          const retrievedDossiers = response.data.data.primaryData._dossiers.data;
          const dossierData = {
            count: retrievedDossiers.length,
            dossiers: retrievedDossiers.map((dossier: any) => ({
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
  }, [setDossierData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return null; // This component does not render any UI itself, it just sets the data
};

export default DossierCount;
