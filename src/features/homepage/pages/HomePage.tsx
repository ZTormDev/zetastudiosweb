import React from "react";
import { BaseLayout } from "../../../shared/layouts";
import { SEOHead } from "../../../shared/components";
import { MAIN_NAVIGATION, DEFAULT_SEO } from "../../../core/config/company";
import { Header, GamesSection, AboutSection, Footer } from "../components";

export const HomePage: React.FC = () => {
  return (
    <BaseLayout className="homepage">
      <SEOHead
        title={DEFAULT_SEO.title}
        description={DEFAULT_SEO.description}
        keywords={DEFAULT_SEO.keywords}
        ogImage={DEFAULT_SEO.ogImage}
      />

      <Header navigation={MAIN_NAVIGATION} />

      <main className="homepage__main">
        <GamesSection />
        <AboutSection />
      </main>

      <Footer />
    </BaseLayout>
  );
};
