import React, { Suspense, lazy } from 'react';
import { Switch, BrowserRouter, Route, Link, Routes } from 'react-router-dom';

const AppRoute = () => {
  const Candidates = lazy(() =>
    import('../../src/components/candidates/index.js')
  );

  return (
    <Candidates />
    // <Suspense fallback={''}>
    //   <BrowserRouter>
    //     <Route path='/' component={Candidates} exact />
    //     <Route path='/candidates' component={Candidates} />
    //   </BrowserRouter>
    // </Suspense>
  );
};

export default AppRoute;
