import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import { Footer, Header, PageNotFound } from './components';
import { Home, RoomDetails } from './pages';
import MoreProducts from './components/MoreProducts';
import Login from './components/Login';
import Register from './components/register';
import ProductDetailsCard3 from './components/produtDetailscard3';
import './styles.css';
import ProductCard2 from './components/productDetailcard2';
const App = () => {

  // const paths = [
  //   { path: '/', element: <Home /> },
  //   { path: '/room/:id', element: <RoomDetails /> },
  //   { path: '*', element: <PageNotFound /> },
  // ]

  // const router = createBrowserRouter(paths);
  // <RouterProvider router={router} /> 

  return (

    <main className=''>
      <BrowserRouter>

        <Header />

        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/room/:id'} element={<RoomDetails />} />
          <Route path="/more-products" element={<MoreProducts />} />
          {/* <Route path="/cart" element={<CartPage />} /> */}
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/product3'} element={<ProductDetailsCard3 />} />
          <Route path={'/product2'} element={<ProductCard2 />} />
          <Route path={'*'} element={<PageNotFound />} />

        </Routes>

        <Footer />

      </BrowserRouter>
    </main>
  )
}

export default App