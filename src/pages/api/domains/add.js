// /app/api/domains/add.js

import { addDomainToVercel } from '@lib/domains';
// import { revalidateTag } from 'next/cache'

export default async function handler(request, res) {
  try {
    const data = await request.body;
    const response = await addDomainToVercel(data.domain);
    // revalidateTag('domain-listing')
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
