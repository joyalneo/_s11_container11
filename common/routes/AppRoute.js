import React, { Suspense, lazy } from 'react';
import { Switch, BrowserRouter, Route, Link, Routes } from 'react-router-dom';

const AppRoute = () => {
  const Candidates = lazy(() =>
    import('../../src/components/candidates/index.js')
  );

  return (
    // <Candidates />
    <Suspense fallback={''}>
      <Switch>
        <Route path='/' component={Candidates} exact />
        <Route path='/container' component={Candidates} />
        <Route path='/candidates' component={Candidates} />
      </Switch>
    </Suspense>
  );
};

export default AppRoute;
