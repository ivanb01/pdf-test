import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { postGoogleContacts } from 'api/google';

const GoogleImportContacts = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    postGoogleContacts()
      .then(res => {
        setResponse(res.data);
        if (res.data.redirect_uri) {
          setLoading(false);
          router.push(res.data.redirect_uri);
        } else {
          setLoading(false);
        }
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  }, []);
  const handleGoToContacts = () => {
    router.push('/contacts/clients');
};

const handleStartCategorizing = () => {
    router.push('/contacts/uncategorized?categorize=true');
};
  const renderTable = (title, data) => {
    if (!data || data.length === 0) {
      return <h1 className="text-2xl font-bold mb-4 mt-6">{data.length} {title}</h1>;
    }

    const columns = Object.keys(data[0]);

    return (
      <div>
        <h1 className="text-2xl font-bold mb-4 mt-6">{data.length} {title}</h1>
        <table className="table-auto w-full">
          <thead>
            <tr>
              {columns.map(column => (
                <th key={column} className="px-4 py-2 text-left">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {columns.map(column => (
                  <td key={column} className="border px-4 py-2">{row[column]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const importNeeded = (data) => {
    let result = "";
    if (data === "Not needed")
        result = "Import is not needed. No new contacts found.";
    else if (data == "Successfull")
        result =  "Import was successful. Continue to categorize.";
    else if (data == "Failed")
        result = "Import failed. Please send an email to dev@opgny.com"
    return <h1 className="text-2xl font-bold mb-4 mt-2">{result}</h1>
  }

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="text-center py-8">Importing Google Contacts...</div>
      ) : error ? (
        <div className="text-center text-red-600 py-8">Error: {error.message}</div>
      ) : (
        <div>
                  <div className="flex justify-between items-center mb-8">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleGoToContacts}
                >
                    Go to Contacts
                </button>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleStartCategorizing}
                >
                    Start Categorizing
                </button>
            </div>
          {importNeeded(response.db_insertion)}
          {renderTable('Import', response.importable_new_contacts)}
          {renderTable('Valid', response.importable_contacts)}
          {renderTable('Invalid', response.invalid_contacts)}
          {renderTable('Exist already', response.existing_contacts)}
        </div>
      )}
    </div>
  );
};

export default GoogleImportContacts;
