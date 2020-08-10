import React from "react";
import { Switch, Route } from "react-router-dom";
import AuthForm from "../auth-window/auth-form.jsx";
import Contacts from "../contacts/contacts.jsx";
const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={() => <AuthForm />} />
      <Route path="/contacts" exact component={() => <Contacts />} />
    </Switch>
  );
};
export default App;
