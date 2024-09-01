import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { City, CityList, CountryList, Form, ProtectedRoute, SpinnerFullPage } from "./components";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";

const Homepage = React.lazy(() => import("./pages/Homepage"));
const Product = React.lazy(() => import("./pages/Product"));
const Pricing = React.lazy(() => import("./pages/Pricing"));
const Login = React.lazy(() => import("./pages/Login"));
const AppLayout = React.lazy(() => import("./pages/AppLayout"));
const PageNotFound = React.lazy(() => import("./pages/PageNotFound"));

function App() {

  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage/>}>
            <Routes>
              <Route path="/" element={<Homepage/>}/>
              <Route path="product" element={<Product/>}/>
              <Route path="pricing" element={<Pricing/>}/>
              <Route path="login" element={<Login/>}/>
              <Route path="app" element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
                <Route index element={<Navigate replace to="cities"/>}/>
                <Route path="cities" element={<CityList/>}/>
                <Route path="cities/:id" element={<City/>}/>
                <Route path="countries" element={<CountryList/>}/>
                <Route path="form" element={<Form/>}/>
              </Route>
              <Route path="*"element={<PageNotFound/>}/>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App
