import logo from './logo.svg';
import './App.css';
import Nav from './Component/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './Component/Footer';
import SignUp from './Component/SignUp';
import PrivateComponent from './Component/PrivateComponent';
import Login from './Component/Login';
import AddProduct from './Component/AddProduct';
import Product from './Component/Product';
import UpdateProduct from './Component/UpdateProduct';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Routes>

          <Route element={<PrivateComponent />} >
            <Route path='/' element={<Product/>} />
            <Route path='/add' element={<AddProduct/>} />
            <Route path='/update/:id' element={<UpdateProduct/>} />
            <Route path='/logout' element={<h1>Logout</h1>} />
            <Route path='/profile' element={<h1>Profile</h1>} />
          </Route>

          <Route path='/signUp' element={<SignUp />} />
          <Route path='/logIn' element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
