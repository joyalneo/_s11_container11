import React, { useEffect, useState } from 'react';
import AppRoute from '../common/routes/AppRoute.js';
import { useFederatedComponent } from 'ab-federation-helpers';
import { shield } from './shield-sdk.js';
import './assets/css/main.scss';
import env from 'env';

const App = () => {
  const [system, setSystem] = useState(undefined);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const authUrl = shield.getAuthUrl();

  const setLayout = () => {
    setSystem({
      module: './layout',
      scope: 'layout',
      url: `${env.BLOX_ENV_URL_layout}/remoteEntry.js`,
    });
  };

  const { Component: FederatedComponent, errorLoading } = useFederatedComponent(
    system?.url,
    system?.scope,
    system?.module,
    React
  );

  useEffect(async () => {
    await shield.init('pRntLlwaYV2OuN_1Kc3Ua-6255');
    const isLoggedinn = await shield.verifyLogin();
    setIsLoggedIn(isLoggedinn);

    if (isLoggedIn) {
      setLayout();
    }
  }, [isLoggedIn]);

  // useEffect(() => {
  //   setLayout();
  // }, []);

  return (
    <React.Suspense fallback={''}>
      <div className='App'>
        {isLoggedIn ? (
          <div>
            {errorLoading
              ? `Error loading module "${module}"`
              : FederatedComponent && (
                  <FederatedComponent>
                    <AppRoute isLoggedIn={isLoggedIn} />
                  </FederatedComponent>
                )}
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </React.Suspense>
  );
};

export default App;
