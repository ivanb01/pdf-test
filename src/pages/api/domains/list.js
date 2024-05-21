// /app/api/domains/list.js

import {
  getDomainsList,
  getConfigResponse,
  getDomainConfig,
  filterDomainsByNames,
} from '@lib/domains';

export default async function handler(request, res) {
  try {
    const { savedDomains } = request.body;
    let domainsList = await getDomainsList();

    let filteredDomains = filterDomainsByNames(savedDomains, domainsList.domains);

    const promises = filteredDomains.map(async (domain) => {
      if (domain.verified) {
        try {
          const configuration = await getDomainConfig(domain.name);
          return { ...domain, configuration }; // Merge domain details with its configuration
        } catch (configError) {
          console.error(`Failed to fetch configuration for domain ${domain.name}:`, configError);
          return { ...domain, configError: configError.message };
        }
      }
      return domain;
    });

    // Resolve all promises to get final domain details
    const updatedDomains = await Promise.all(promises);
    return res.json({ domains: updatedDomains });
  } catch (error) {
    console.log('Failed to fetch domains:', error);
    return res.status(500).json({ error: 'Failed to fetch domains' });
  }
}
