import Estimates from 'components/pages/pricing/estimates';
import Faq from 'components/pages/pricing/faq';
import Hero from 'components/pages/pricing/hero';
import Layout from 'components/shared/layout';

const PricingPage = () => (
  <Layout
    className="bg-black text-white"
    headerTheme="black"
    footerTheme="black"
    footerWithTopBorder
  >
    <Hero />
    <Estimates />
    <Faq />
  </Layout>
);

export default PricingPage;
