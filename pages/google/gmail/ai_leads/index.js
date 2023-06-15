import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getGmailLeadsAI } from 'api/google'; // Adjust the path to your function file

export default function GmailAILeads() {
  const router = useRouter();
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchGmailAILeads = async () => {
      try {
        const response = await getGmailLeadsAI();
        const leadsData = response.data;
        setLeads(leadsData);
      } catch (error) {
        console.error('Error:', error.message);
        // Handle the error if needed
      }
    };

    fetchGmailAILeads();
  }, []);

  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRow = (index) => {
    const newExpandedRows = [...expandedRows];
    if (newExpandedRows.includes(index)) {
      const indexToRemove = newExpandedRows.indexOf(index);
      newExpandedRows.splice(indexToRemove, 1);
    } else {
      newExpandedRows.push(index);
    }
    setExpandedRows(newExpandedRows);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">OxfordAI Labs</h1>
      <p className="mb-4">Early preview: Retreiving leads from Gmail</p>

      <div>
        <h2 className="text-xl font-bold mb-2">Leads:</h2>
        {leads.length > 0 ? (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, index) => (
                <React.Fragment key={index}>
                  <tr
                    className={lead.result.stored ? 'bg-green-200' : 'bg-red-200'}
                    onClick={() => toggleRow(index)}
                  >
                    <td className="px-4 py-2">{lead.email.from}</td>
                    <td className="px-4 py-2">{lead.result.first_name}</td>
                    <td className="px-4 py-2">{lead.result.last_name}</td>
                    <td className="px-4 py-2">{lead.result.stored ? 'Stored' : 'Not Stored'}</td>
                  </tr>
                  {expandedRows.includes(index) && (
                    <tr>
                      <td colSpan="4" className="px-4 py-2">
                        <pre>{JSON.stringify(lead, null, 2)}</pre>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No leads found.</p>
        )}
      </div>
    </div>
  );
}
