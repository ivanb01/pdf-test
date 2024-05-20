// /app/api/domains/verify.js

import {
  verifyDomain,
  domainIsAuthorized,
} from '@lib/domains';

export default async function handler(request, res) {
  try {
    const data = await request.body;

    const isValid = domainIsAuthorized(data.domain, data.savedDomains);

    if (!isValid) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const response = await verifyDomain(data.domain);
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to verify domain' });
  }
}
