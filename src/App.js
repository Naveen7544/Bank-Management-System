import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuBar from "./components/MenuBar";
import "./App.css"

const HomePage = lazy(() => import("./pages/HomePage"));
const CreateCustomer = lazy(() => import('./pages/CreateCustomer'));
const Customer = lazy(() => import('./pages/Customer'));
const CreateBeneficiary = lazy(() => import('./pages/CreateBeneficiary'));
const Beneficiary = lazy(() => import('./pages/Beneficiary'));

const App = () => {
  const user = useSelector((state) => state.userLogin?.user?.data?.userId);

  console.log("checkuserLogin", user);
  return (
    <>
      {" "}
      <MenuBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/homepage" /> : <HomePage />}
          />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/create-customer" element={<CreateCustomer />} />
          <Route path="/edit-customer/:id" element={<CreateCustomer />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/create-beneficiary" element={<CreateBeneficiary />} />
          <Route path="/beneficiary" element={<Beneficiary />} />
          <Route path="/edit-beneficiary/:id" element={<CreateBeneficiary />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
