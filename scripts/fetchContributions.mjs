import fs from 'fs';
import path from 'path';

const SRC_DATA_DIR = path.resolve(process.cwd(), 'src/data');

const FEATURED_ORGS = [
  'CERN',
  'Deepmind',
  'supermemory',
  'CERN-HSF'
];

async function fetchContributions() {
  const headers = { 'Accept': 'application/vnd.github.v3+json' };
  if (process.env.GH_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GH_TOKEN}`;
  }

  const query = 'is:pr is:merged author:Paramveersingh-S -user:Paramveersingh-S';
  const url = `https://api.github.com/search/issues?q=${encodeURIComponent(query)}&per_page=100`;

  const res = await fetch(url, { headers });
  const data = await res.json();

  if (!data.items) {
    console.error("Failed to fetch contributions:", data);
    return;
  }

  const orgsMap = {};
  
  data.items.forEach(pr => {
    // pr.repository_url: "https://api.github.com/repos/org/repo"
    const match = pr.repository_url.match(/repos\/([^\/]+)\/([^\/]+)$/);
    if (match) {
      const org = match[1];
      const repo = `${org}/${match[2]}`;
      if (!orgsMap[org]) {
        orgsMap[org] = {
          org,
          orgUrl: `https://github.com/${org}`,
          avatarUrl: `https://github.com/${org}.png`,
          pullRequests: []
        };
      }
      orgsMap[org].pullRequests.push({
        title: pr.title,
        repo,
        url: pr.html_url,
        mergedAt: pr.pull_request?.merged_at || pr.closed_at // fallback
      });
    }
  });

  const organizations = Object.values(orgsMap);
  
  // Sort by featured, then by PR count
  organizations.sort((a, b) => {
    const aFeatured = FEATURED_ORGS.includes(a.org) ? FEATURED_ORGS.indexOf(a.org) : 999;
    const bFeatured = FEATURED_ORGS.includes(b.org) ? FEATURED_ORGS.indexOf(b.org) : 999;
    
    if (aFeatured !== 999 || bFeatured !== 999) {
      return aFeatured - bFeatured;
    }
    return b.pullRequests.length - a.pullRequests.length;
  });

  const result = {
    totalMergedPRs: data.total_count,
    organizations
  };

  fs.writeFileSync(path.join(SRC_DATA_DIR, 'oss-contributions.json'), JSON.stringify(result, null, 2));
  
  // also save featuredOrgs.json for completeness
  fs.writeFileSync(path.join(SRC_DATA_DIR, 'featuredOrgs.json'), JSON.stringify(FEATURED_ORGS, null, 2));
  console.log('fetchContributions complete.');
}

fetchContributions();
