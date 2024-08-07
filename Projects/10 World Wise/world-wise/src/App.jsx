import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout, Homepage, Login, PageNotFound, Pricing, Product } from "./pages";
import { City, CityList, CountryList, Form, ProtectedRoute } from "./components";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";

function App() {

  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App
