import Router from 'next/router';
import { AppProps } from 'next/app';

import Layout from '../components/layout/layout';

import Auth0Provider from '../auth0/auth0-provider';
import config from '../auth0/auth0-config.json';

const onRedirectCallback = (appState): void => {
  Router.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const MyApp: React.FC<AppProps> = ({ Component, pageProps }): JSX.Element => {
  return (
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientID}
      get_redirect_uri={(): string => window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <Layout content={<Component {...pageProps} />} />
    </Auth0Provider>
  );
};

export default MyApp;
