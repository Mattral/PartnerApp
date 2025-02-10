import { useEffect, useState } from 'react';

interface DocumentOption {
  name: string;
  value: string;
}

export const useDocumentOptions = () => {
  const [documentOptions, setDocumentOptions] = useState<DocumentOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL  ;  // `${baseUrl}/`
      const url = `${baseUrl}/api/partner/advisor-identification-documents`;
      const searchKey = ""; // Replace with your search key, if needed

      const headers = {
        'COMPANY-CODE': process.env.NEXT_PUBLIC_COMPANY_CODE || "error no company code from ENV", // Replace with actual company code
        'FRONTEND-KEY': 'XXX', // Replace with actual frontend key
        'X-Requested-With': 'XMLHttpRequest', // Required header
      };

      // Get the URL search parameters (query string)
      const urlParams = new URLSearchParams(window.location.search);
      const ed_code = urlParams.get('ed_code'); // Retrieve the ed_code from the query string

      if (!ed_code) {
        setError('ed_code is missing from the query string');
        setLoading(false);
        return;
      }

      const queryParams = new URLSearchParams({ searchKey });

      try {
        const response = await fetch(`${url}/${ed_code}`, { headers });

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

  return { documentOptions, loading, error };
};
