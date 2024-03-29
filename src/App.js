import React from "react";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./main/webapp/vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./../src/main/webapp/css/style.css";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./main/webapp/jsx/components/Home";
import PatientDetail from "./main/webapp/jsx/components/Patient/PatientDetail";
import RegisterPatientPage from "./main/webapp/jsx/components/Patient/RegisterPatient";
import ImmunizationHome from "./main/webapp/jsx/components/Immunization/ImmunizationHome";
import TetanusHome from "./main/webapp/jsx/components/Tetanus/TetanusHome";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "./main/webapp/jsx/utils/queryClient";

export default function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div>
          <ToastContainer  autoClose={3000} hideProgressBar position="bottom-center"/>
          <Switch>
            <Route path="/tetanus-patient">
              <TetanusHome />
            </Route>
            <Route path="/routine-immunization-patient">
              <ImmunizationHome />
            </Route>
            <Route path="/patient-vaccination-history">
              <PatientDetail />
            </Route>
            <Route path="/register-patient">
              <RegisterPatientPage />
            </Route>

            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Router>
  );
}
