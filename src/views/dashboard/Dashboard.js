import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import './Dashboard.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';

import dashboardRoutes from "../../routes/dashboard";

class Dashboard extends React.Component {
  render() {
    return (
      <div className="main">
        <Sidebar />
        <div className="content">
          <Header />
          <main className="main-panel">
            <Switch>
              {dashboardRoutes.map((prop, key) => {
                if (prop.redirect)
                  return <Redirect from={prop.path} to={prop.to} key={key} />;
                return (
                  <Route path={prop.path} component={prop.component} key={key} />
                );
              })}
            </Switch>
          </main>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
