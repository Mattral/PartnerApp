import React, { useEffect, useState } from 'react';

// Type for each document option
interface DocumentOption {
  name: string;
  value: string;
}

const DocOptions = () => {
  const [documentOptions, setDocumentOptions] = useState<DocumentOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      const url = "https://lawonearth.co.nz/api/partner/client-identification-documents";
      const searchKey = "example_search_key"; // Replace with your search key, if needed

      const headers = {
        'COMPANY-CODE': 'MC-9E234746-3738-4E49-A7FA-27E3998A68E9', // Replace with actual company code
        'FRONTEND-KEY': 'XXX', // Replace with actual frontend key
        'X-Requested-With': 'XMLHttpRequest', // Required header
      };

      const queryParams = new URLSearchParams({ searchKey });

      try {
        const response = await fetch(`${url}?${queryParams.toString()}`, { headers });

        if (response.ok) {
          const data = await response.json();
          const documents = data?.data?.primaryData?._idocuments?.data || [];

          // Map the documents to the format you need (name-value pairs)
          const options = documents.map((doc: any) => ({
            name: doc.idoc_name,
            value: doc.vidoc_code,
          }));

          setDocumentOptions(options);
        } else {
          setError('Failed to fetch documents');
        }
      } catch (error) {
        setError('Error fetching documents');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // You can now return the document options in the desired format
  return (
    <div>
      <h1>Document Options</h1>
      <pre>{JSON.stringify(documentOptions, null, 2)}</pre>
    </div>
  );
};

export default DocOptions;
