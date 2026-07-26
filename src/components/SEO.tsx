import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  structuredData?: object | object[];
  image?: string;
  preloadImage?: string;
}

export default function SEO({
  title,
  description,
  canonical,
  structuredData,
  image,
  preloadImage,
}: SEOProps) {
  const location = useLocation();
  const siteUrl = 'https://ashwinisalon.com';
  const currentPath = canonical || location.pathname;
  
  // Clean up canonical URL (remove trailing slashes, ensure correct structure)
  const fullCanonicalUrl = currentPath === '/' 
    ? siteUrl 
    : `${siteUrl}${currentPath.startsWith('/') ? currentPath : `/${currentPath}`}`;
    
  const siteName = 'Elixir Luxury Salon';
  // Use a default image if none provided
  const ogImage = image ? `${siteUrl}${image}` : `${siteUrl}/images/gallery/gallery-1.jpg`; 

  // Format title to avoid duplicating site name if it's already there
  const formattedTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{formattedTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonicalUrl} />
      {preloadImage && <link rel="preload" as="image" href={preloadImage} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonicalUrl} />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
