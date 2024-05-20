"use client";
import React, { useState, useEffect } from "react";
import { PlusCircle, Loader } from "lucide-react";
import { validDomainRegex } from "@lib/domains";
import { cn } from "@lib/utils";
import SettingsLayout from '@components/Layout/SettingsLayout';
import TopBar from '@components/shared/top-bar';
import useLocalStorage from "hooks/useLocalStorage";

const DomainList = ({ domains, onRemove, onVerify }) => (
  <div className="space-y-4 mt-5 w-full">
    {domains.map((domain) => (
      <div key={domain.name} className="bg-gray-100 p-3 rounded-md shadow">
        <div className="flex justify-between items-center">
          <div>
            <a target="_blank" href={`https://${domain.name}`}>{domain.name}</a><br/>
            <a target="_blank" href={`https://sites.onelinecrm.com/${domain.name}`}>{`sites.onelinecrm.com/${domain.name}`}</a>
            {domain.verified && !domain.configuration?.misconfigured ? (
              <span className="ml-2 text-green-500">(Verified)</span>
            ) : domain.configuration?.misconfigured ? (
              <span className="ml-2 text-orange-500">(Misconfigured)</span>
            ) : (
              <span className="ml-2 text-red-500">(Needs Verification)</span>
            )}
          </div>
          <div className="flex items-center">
            {!domain.verified && (
              <button onClick={() => onVerify(domain.name)} className="mr-2 p-2 text-yellow-500 hover:text-yellow-600">
                Verify
              </button>
            )}
            <button onClick={() => onRemove(domain.name)} className="p-2 text-red-500 hover:text-red-600">
              Remove
            </button>
          </div>
        </div>
        {!domain.verified && (
          <div className="mt-2">
            <p className="mb-2 font-medium">Add the following records to your DNS provider to verify the domain:</p>
            <table className="w-full text-sm text-left text-gray-500 overflow-auto block">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Domain</th>
                  <th className="px-6 py-3">Value</th>
                  <th className="px-6 py-3">Reason</th>
                </tr>
              </thead>
              <tbody>
                {domain.verification?.map((verification, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4">{verification.type}</td>
                    <td className="px-6 py-4">{verification.domain}</td>
                    <td className="px-6 py-4">{verification.value}</td>
                    <td className="px-6 py-4">{verification.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {domain.configuration && domain.configuration.misconfigured && (
          <div className="mt-2 text-orange-500">
            <p className="mb-2 font-medium">This domain is misconfigured. Please update your DNS settings as needed:</p>
            <ul>
              <li>DNS Update: Type A, Name @, Values {domain.configuration.aValues.join(" | ")}</li>
              <li>Or Nameservers: {domain.configuration.nameservers.join(", ")}</li>
              <li>Record Conflicts: {domain.configuration.conflicts.length > 0 ? domain.configuration.conflicts.join(", ") : "None"}</li>
            </ul>
          </div>
        )}
        { domain.error && (
          <div className="mt-5">
            Status<br/>
            <span className="text-sm text-red-700">{domain.error.code}</span><br/>
            <span className="text-sm text-red-700">{domain.error.message}</span><br/>
          </div>
        )}
      </div>
    ))}
  </div>
);

export default function DomainConfiguration() {
  const [domains, setDomains] = useState([]);
  const [savedDomains, setSavedDomains] = useLocalStorage('domains', domains);
  const [loading, setLoading] = useState(false);
  const [newDomain, setNewDomain] = useState('');

  useEffect(() => {
    const fetchDomains = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/domains/list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            savedDomains: savedDomains.map((d) => d.name),
          })
        });
        const data = await response.json();
        setDomains(data.domains || []);
      } catch (error) {
        console.error('Failed to fetch domains:', error);
      }
      setLoading(false);
    };

    fetchDomains();
  }, []);

  const handleDomainAction = async (domainName, action) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/domains/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: domainName,
          savedDomains: savedDomains.map((d) => d.name),
        })
      });
      const data = await response.json();

      if (data.error) {
        console.error(`Error: ${JSON.stringify(data.error)}`);
        setDomains(domains.map(domain => domain.name === domainName ? { ...domain, error: data.error } : domain));
        setSavedDomains(domains.map(domain => domain.name === domainName ? { ...domain, error: data.error } : domain))
      } else {
        let updatedDomains = [];
        if (action === 'add') {
          updatedDomains = [...domains, data];
        } else if (action === 'verify') {
          updatedDomains = domains.map(domain => domain.name === domainName ? { ...domain, verified: data.verified } : domain);
        } else if (action === 'remove') {
          updatedDomains = domains.filter(domain => domain.name !== domainName);
        }
        setDomains(updatedDomains);
        setSavedDomains(updatedDomains)
      }
    } catch (error) {
      console.error('Failed to perform domain action:', error);
    }
    setLoading(false);
  };

  return (
    <SettingsLayout>
      <TopBar text="Websites" />
      <div className="flex max-w-6xl mx-auto flex-col items-left justify-center p-24 bg-white dark:bg-gray-900">
        <div className="flex row align-center justify-center mb-8">
          <h2 className="text-2xl font-bold">Domain Configuration</h2>
        </div>
        <div className="flex gap-2">
          <input 
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            placeholder="Add a new domain"
            className="flex-1 input bg-white border border-gray-300 rounded px-4 py-2"
            disabled={loading}
          />
          <button 
            onClick={() => handleDomainAction(newDomain, 'add')}
            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            disabled={loading || !validDomainRegex.test(newDomain)}
          >
            {loading ? <Loader className="animate-spin mr-2" /> : <PlusCircle className="mr-2" />} Add Domain
          </button>
        </div>
        <DomainList domains={domains} onRemove={(name) => handleDomainAction(name, 'remove')} onVerify={(name) => handleDomainAction(name, 'verify')} />
      </div>
    </SettingsLayout>
  );
}
