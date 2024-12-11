"use client"
// pages/dossiers.tsx
import { useState } from 'react';
import DossierCount from 'views/apps/DossierCount';

type Dossier = {
  vd_code: string;
  vd_status: string;
};

const DossierPage = () => {
  const [dossierData, setDossierData] = useState<{ count: number; dossiers: Dossier[] } | null>(null);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dossier Cards</h1>

      {/* Pass the setDossierData function to DossierCount */}
      <DossierCount setDossierData={setDossierData} />

      {dossierData ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {dossierData.dossiers.map((dossier) => (
            <div
              key={dossier.vd_code}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                backgroundColor: '#fff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{dossier.vd_code}</div>
              <div style={{ marginBottom: '16px' }}>{dossier.vd_status}</div>
              <button
                onClick={() => alert('Configure clicked')}
                style={{
                  alignSelf: 'flex-end',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Configure
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading Dossier Data...</div>
      )}
    </div>
  );
};

export default DossierPage;
