import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ProjectList from './projects/ProjectList';
import ProjectDashboard from './projects/ProjectDashboard';
import Header from './siteLayout/Header';
import Create from './crud/create';
import M from "materialize-css";

const Welcome = () => <div>Welcome</div>;

function App() {

  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Route exact path="/" component={Welcome} />
        <Route exact path="/project/new" render={(props) => <Create {...props} entity={"project"} />} />
        <Route exact path="/project/:id" component={ProjectDashboard} />
        <Route exact path="/project/:projectId/:entity/new" component={Create} />
      </div>
    </BrowserRouter >

  );
}

export default App;
