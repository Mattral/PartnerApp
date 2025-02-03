"use client";
import { useEffect, useState } from 'react';

// Define types for the API response and data structure
interface VIDocData {
  idoc_name: string;
  vidoc_code: string;
  vidoc_type: string;
  vidoc_nbPoint: number;
  idoc_code: string;
}

interface APIResponse {
  status: string;
  data: {
    primaryData: {
      msg?: string;
      _pointSystemConfigs: {
        data: {
          vlvl_minNbPoint: number;
          vlvl_minNbPrimaryDoc: number;
          vlvl_code: string;
          vidoc_code: string;
          vidoc_type: string;
          vidoc_nbPoint: number;
          idoc_code: string;
          idoc_name: string;
        }[];
      };
    };
  };
}

const PointSystemConfig = () => {
  const [data, setData] = useState<APIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lawonearth.co.uk';  // `${baseUrl}/`

        const response = await fetch(
          `${baseUrl}/api/back-office/core/point-system-configs`,
          {
            method: 'GET',
            headers: {
              Authorization: 'Bearer 468|Z3R1e6AafzevNYXbMF2QJhpkcwfKpukgqNjTGbI7dbde9b5f',
              'COMPANY-CODE': 'def-mc-admin',
              'FRONTEND-KEY': 'XXX',
              'TARGET-COMPANY-CODE': 'MC-H3HBRZU6ZK5744S',
              'PaginateResults': '1',
              'MaxResultsPerPage': '12',
              'X-Requested-With': 'XMLHttpRequest',
            },
          }
        );
        const result: APIResponse = await response.json();
        if (result.status === 'treatmentSuccess') {
          setData(result);
        } else {
            // Handle non-success responses (e.g., authentication errors)
            const errorMsg = result.data?.primaryData?.msg || 'Failed to fetch data';
            setError(errorMsg);
          }
        } catch (error: any) {
            // In case of network errors, or any errors that occur during fetch
            const errorMessage = error.message || 'An error occurred while fetching data';
            setError(errorMessage);
          }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const primaryData = data.data.primaryData._pointSystemConfigs.data;

  // Extract vlvl values from the first element
  const { vlvl_minNbPoint, vlvl_minNbPrimaryDoc, vlvl_code } = primaryData[0] || {};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 via-teal-50 to-blue-100">
      <div className="container mx-auto p-6 text-center">
        {/* Render VLvl Info with Glowing Effect */}
        <div className="space-y-6 mb-8">
          <div className="text-xl font-semibold text-gray-800 glow-effect">
            <strong>Minimum Points Required: </strong>{vlvl_minNbPoint ?? 0}
          </div>
          <div className="text-xl font-semibold text-gray-800 glow-effect">
            <strong>Minimum Primary Documents: </strong>{vlvl_minNbPrimaryDoc ?? 0}
          </div>
          <div className="text-xl font-semibold text-gray-800 glow-effect">
            <strong>VLvl Code: </strong>{vlvl_code ?? 'N/A'}
          </div>
        </div>

        {/* Show Advanced Checkbox */}
        <div className="flex justify-center items-center space-x-3 mb-6">
          <input
            type="checkbox"
            id="show-advanced"
            checked={showAdvanced}
            onChange={() => setShowAdvanced(!showAdvanced)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <label htmlFor="show-advanced" className="text-lg font-medium text-gray-700">
            Show Advanced
          </label>
        </div>

        {/* Render Table */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left">IDoc Name</th>
                {showAdvanced && (
                  <>
                    <th className="px-6 py-3 text-left">VIDoc Code</th>
                    <th className="px-6 py-3 text-left">IDoc Code</th>
                  </>
                )}
                <th className="px-6 py-3 text-left">VIDoc Type</th>
                <th className="px-6 py-3 text-left">VIDoc Points</th>
              </tr>
            </thead>
            <tbody>
              {primaryData.map((row, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm text-gray-700">
                    <span className="relative group">
                      {row.idoc_name}
                      <span className="absolute left-0 hidden group-hover:block text-xs text-white bg-black p-1 rounded">
                        {row.vidoc_code}
                      </span>
                    </span>
                  </td>
                  {showAdvanced && (
                    <>
                      <td className="px-6 py-3 text-sm text-gray-700">{row.vidoc_code}</td>
                      <td className="px-6 py-3 text-sm text-gray-700">{row.idoc_code}</td>
                    </>
                  )}
                  <td className="px-6 py-3 text-sm text-gray-700">{row.vidoc_type}</td>
                  <td className="px-6 py-3 text-sm text-gray-700">{row.vidoc_nbPoint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PointSystemConfig;
