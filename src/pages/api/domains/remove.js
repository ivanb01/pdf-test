// /app/api/domains/remove.js

import {
  removeDomainFromVercelProject,
  removeDomainFromVercelTeam,
  domainIsAuthorized,
} from '@lib/domains';
// import { revalidateTag } from 'next/cache'

export default async function handler(request, res) {
  try {
    const data = await request.body;

    const isValid = domainIsAuthorized(data.domain, data.savedDomains);

    if (!isValid) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    await removeDomainFromVercelProject(data.domain);
    // await removeDomainFromVercelTeam(data.domain);
    // revalidateTag('domain-listing')
    return res.json({ message: 'Domain successfully removed' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to remove domain' });
  }
}
