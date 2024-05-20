export const addDomainToVercel = async (domain) => {
  return await fetch(
    `https://api.vercel.com/v10/projects/${
      process.env.PROJECT_ID_VERCEL
    }/domains${
      process.env.TEAM_ID_VERCEL ? `?teamId=${process.env.TEAM_ID_VERCEL}` : ""
    }`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: domain,
        // Optional: Redirect www. to root domain
        // ...(domain.startsWith("www.") && {
        //   redirect: domain.replace("www.", ""),
        // }),
      }),
    },
  ).then((res) => res.json());
};

export const removeDomainFromVercelProject = async (domain) => {
  return await fetch(
    `https://api.vercel.com/v9/projects/${
      process.env.PROJECT_ID_VERCEL
    }/domains/${domain}${
      process.env.TEAM_ID_VERCEL ? `?teamId=${process.env.TEAM_ID_VERCEL}` : ""
    }`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
      },
      method: "DELETE",
    },
  ).then((res) => res.json());
};

export const removeDomainFromVercelTeam = async (domain) => {
  return await fetch(
    `https://api.vercel.com/v6/domains/${domain}${
      process.env.TEAM_ID_VERCEL ? `?teamId=${process.env.TEAM_ID_VERCEL}` : ""
    }`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
      },
      method: "DELETE",
    },
  ).then((res) => res.json());
};

export const getDomainResponse = async (domain) => {
  return await fetch(
    `https://api.vercel.com/v9/projects/${
      process.env.PROJECT_ID_VERCEL
    }/domains/${domain}${
      process.env.TEAM_ID_VERCEL ? `?teamId=${process.env.TEAM_ID_VERCEL}` : ""
    }`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    },
  ).then((res) => {
    return res.json();
  });
};


export const getDomainsList = async () => {
  return await fetch(
    `https://api.vercel.com/v9/projects/${process.env.PROJECT_ID_VERCEL}/domains?limit=2000&order=ASC&redirects=true&teamId=${process.env.TEAM_ID_VERCEL}&until=${new Date().getTime()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
      next: { tags: ['domain-listing'] },
      cache: 'no-store',
    },
  ).then((res) => {
    return res.json();
  });
};

export const getDomainConfig = async (domain) => {
  return await fetch(
    `https://api.vercel.com/v6/domains/${domain}/config${
      process.env.TEAM_ID_VERCEL ? `?teamId=${process.env.TEAM_ID_VERCEL}` : ""
    }`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    },
  ).then((res) => res.json());
};

export const getConfigResponse = async (domain) => {
  return await fetch(
    `https://api.vercel.com/v9/projects/${process.env.PROJECT_ID_VERCEL}/domains/${domain}${
      process.env.TEAM_ID_VERCEL ? `?teamId=${process.env.TEAM_ID_VERCEL}` : ""
    }`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    },
  ).then((res) => res.json());
};

export const verifyDomain = async (domain) => {
  return await fetch(
    `https://api.vercel.com/v9/projects/${
      process.env.PROJECT_ID_VERCEL
    }/domains/${domain}/verify${
      process.env.TEAM_ID_VERCEL ? `?teamId=${process.env.TEAM_ID_VERCEL}` : ""
    }`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    },
  ).then((res) => res.json());
};

export const getSubdomain = (name, apexName) => {
  if (name === apexName) return null;
  return name.slice(0, name.length - apexName.length - 1);
};

export const getApexDomain = (url) => {
  let domain;
  try {
    domain = new URL(url).hostname;
  } catch (e) {
    return "";
  }
  const parts = domain.split(".");
  if (parts.length > 2) {
    // if it's a subdomain (e.g. dub.vercel.app), return the last 2 parts
    return parts.slice(-2).join(".");
  }
  // if it's a normal domain (e.g. dub.sh), we return the domain
  return domain;
};

// courtesy of ChatGPT: https://sharegpt.com/c/pUYXtRs
export const validDomainRegex = new RegExp(
  /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
);

export const filterDomainsByNames = (filterNames, domains) => {
  if (!domains || !filterNames) return [];
  return domains.filter(domain => filterNames.includes(domain.name));
};


export const domainIsAuthorized = (domain, domains) => {
  if (!Array.isArray(domains) || domains.length === 0) {
    return false;
  }
  return domains.some(_domain => domain === _domain);
};
