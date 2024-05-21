import {
  getConfigResponse,
  domainIsAuthorized,
} from '@lib/domains';

export default async function handler(request, res) {
  try {
    const { domain, savedDomains } = request.body;

    const isValid = domainIsAuthorized(domain, savedDomains);

    if (!isValid) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const response = await getConfigResponse(domain);
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
