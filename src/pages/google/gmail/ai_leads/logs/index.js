import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getGmailAILogs } from 'api/google'; // Adjust the path to your function file

export default function GmailAILogs() {
  const router = useRouter();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchGmailAILogs = async () => {
      try {
        const response = await getGmailAILogs();
        const logsData = response.data.data;
        setLogs(logsData);
      } catch (error) {
        console.error('Error:', error.message);
        // Handle the error if needed
      }
    };

    fetchGmailAILogs();
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
      <div>
        <h2 className="text-xl mb-2">
          Gmail AI Logs <span className="text-sm">(early preview)</span>
        </h2>
        {logs.length > 0 ? (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">From</th>
                <th className="px-4 py-2 text-left">💬 Category</th>
                <th className="px-4 py-2 text-left">💬 Summary</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <React.Fragment key={index}>
                  <tr
                    className={`${
                      logs.result_contact_stored_in_db ? 'bg-green2' : 'bg-gray1'
                    } cursor-pointer hover:bg-gray-200 transition-colors duration-200 ease-in-out`}
                    onClick={() => toggleRow(index)}
                  >
                    <td className="px-4 py-2">
                      {expandedRows.includes(index) ? '−' : '+'} {log.email_from}
                    </td>
                    <td className="px-4 py-2">
                      {log.ai_contact_category_1 || log.ai_contact_category_2
                        ? `${log.ai_contact_category_1 || ''} ${log.ai_contact_category_2 || ''}`
                        : log.result_contact_category_id === 1
                        ? 'Uncategorized'
                        : log.result_contact_category_id}
                    </td>
                    <td className="px-4 py-2">
                      {log.ai_email_summary ? `${log.ai_email_summary} - ` : 'No AI summary - '}
                      <a href={log.email_link} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                        (view mail) <i className="fas fa-arrow-right"></i>
                      </a>
                    </td>
                  </tr>
                  {expandedRows.includes(index) && (
                    <tr>
                      <td colSpan="4" className="px-4 py-2">
                        <pre>{JSON.stringify(log.result_data, null, 2)}</pre>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <p>💬 thinking ...</p>
        )}
      </div>
    </div>
  );
}
