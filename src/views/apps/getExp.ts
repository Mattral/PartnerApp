// getExp.ts
export const getExpertiseDomains = async (): Promise<{ ed_name: string, ed_code: string }[]> => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/partner/expertise-domains`;
  
    const headers = {
      'COMPANY-CODE': process.env.NEXT_PUBLIC_COMPANY_CODE || "error no company code from ENV",
      'FRONTEND-KEY': 'XXX', // Replace with the correct frontend key
      'PaginateResults': '1',
      'MaxResultsPerPage': '12',
      'X-Requested-With': 'XMLHttpRequest',
    };
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      const domains = data.data.primaryData._domains.data;
  
      // Map to return only the required fields (ed_name and ed_code)
      return domains.map((domain: any) => ({
        ed_name: domain.ed_name,
        ed_code: domain.ed_code,
      }));
    } catch (error) {
      console.error('Error fetching expertise domains:', error);
      return [];
    }
  };
  