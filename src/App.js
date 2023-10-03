import './App.css';
import Product from './components/product';
import Customer from './components/Customer';
import { BrowserRouter, Routes, Route, Navigate, NavLink } from "react-router-dom";
import Navigation from './common/Navigation';
import Details from './components/Details';
import SalesDetails from './components/Financial';
import SalesBill from './components/sales';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Routes>
      <Route
        path="/customer"
        element={
          <Navigation>
            <Customer />
          </Navigation>
        }
      />

      <Route
        path="/bill"
        element={
          <Navigation>
            <SalesBill />
          </Navigation>
        }
      />
      <Route
        path="/sales"
        element={
          <Navigation>
            <SalesDetails />
          </Navigation>
        }
      />
      <Route
        path="/"
        element={
          <Navigation>
            <Details />
          </Navigation>
        }
      />

      <Route
        path="/dashboard"
        element={
          <Navigation>
            <Dashboard />
          </Navigation>
        }
      />
      <Route
        path="/product"
        element={
          <Navigation>
            <Product />
          </Navigation>
        }
      />

    </Routes>

  );
}

export default App;
