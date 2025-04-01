// pages/_app.js
import '../styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps, router }) {
  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </Layout>
  );
}

export default MyApp;