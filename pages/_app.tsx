import { AppProps } from 'next/app';

import Layout from '../components/layout/layout';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Layout content={<Component {...pageProps} />} />;
};

export default MyApp;
