import { GetServerSideProps } from 'next';
import { projects } from '@/src/data/projects';

function generateSiteMap() {
  const baseUrl = 'https://nathan-ferre.fr';
  
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/projects',
    '/socials',
  ];
  
  // Dynamic project pages
  const projectPages = projects.map(project => `/projects/${project.slug}`);
  
  const allPages = [...staticPages, ...projectPages];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map((page) => {
      return `
    <url>
      <loc>${baseUrl}${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${page === '' ? 'weekly' : 'monthly'}</changefreq>
      <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>
  `;
    })
    .join('')}
</urlset>
  `;
}

function SiteMap() {
  // This component doesn't render anything
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
