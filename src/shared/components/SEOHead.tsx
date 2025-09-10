import React from "react";
import { Helmet } from "react-helmet";
import { generateMetaTags } from "../../core/utils";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  url?: string;
  children?: React.ReactNode;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  ogImage,
  url,
  children,
}) => {
  const metaTags = generateMetaTags({
    title,
    description,
    keywords,
    ogImage,
    url,
  });

  return (
    <Helmet title={metaTags.title}>
      {metaTags.meta.map((tag, index) => (
        <meta key={index} {...tag} />
      ))}
      {children}
    </Helmet>
  );
};
