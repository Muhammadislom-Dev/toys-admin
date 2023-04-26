import "./App.css";
import { Route, Switch } from "react-router-dom";
import { SignIn } from "./components/signin";
import { ToastContainer } from "react-toastify";
import MiniDrawer from "./components/sidebar";
import PrivateRoute from "./components/layout/PrivateRoute";
import CompanyTable from "./components/company/CompanyTable";
import ProductTable from "./components/products/ProductTable";
import NewsTable from "./components/news/NewsTable";
import TypesTable from "./components/types/TypesTable";
import AboutTable from "./components/about/AboutTable";
import WorkersTable from "./components/workers/WorkersTable";

function App() {
  return (
    <>
      <Switch>
        <Route component={SignIn} path={"/login"} />
        <div>
          <MiniDrawer>
            <PrivateRoute component={CompanyTable} exact />
            <PrivateRoute component={ProductTable} path="/products" exact />
            <PrivateRoute component={WorkersTable} path="/news" exact />
            <PrivateRoute component={AboutTable} path="/workers" exact />
          </MiniDrawer>
        </div>
      </Switch>
      <ToastContainer />
    </>
  );
}

export default App;
