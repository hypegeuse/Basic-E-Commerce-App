import { useEffect } from 'react'
import './App.css'
import PageContainer from './container/PageContainer'
import Header from './components/Header'
import RouterConfig from './config/RouterConfig'
import Loading from './components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from './redux/slices/productSlice' // Slice içindeki fetch fonksiyonun
import { calculateBasket, setDrawerOpen } from './redux/slices/basketSlice'
import Drawer from '@mui/material/Drawer'

function App() {

  const { products, drawerOpen, totalAmount } = useSelector((store) => store.basket);

  const dispatch = useDispatch();

  useEffect(() => {
    // Uygulama ilk açıldığında veya yenilendiğinde ürünleri getir
    dispatch(getAllProducts());
  }, [dispatch]);
  useEffect(() => {
    // Sepetteki ürünler değiştiğinde toplam tutarı hesapla
    dispatch(calculateBasket());
  }, [dispatch, products]);

  return (
    <div>
      <PageContainer>
        <Header />
        <RouterConfig />
        <Loading />
        <Drawer className="drawer" anchor="right" open={drawerOpen} onClose={() => dispatch(setDrawerOpen())}>
          {
            products && products.map((product) => {
              return (
                <div key={product.id}>
                  <div className='flex-row' style={{ padding: '20px' }}>
                    <img style={{ marginRight: '5px' }} src={
                      product.image
                    }
                      width={50}
                      height={50}
                    />
                    <p style={{ width: '320px', marginRight: '5px' }} >{product.title}({product.count})</p>
                    <p style={{ fontWeight: 'bold', marginRight: '10px', width: '60px' }}>{product.price}TL</p>
                    <button style={{ padding: '5px', borderRadius: '10px', backgroundColor: 'rgb(185,76,76)', color: 'white', border: 'none', width: '50px' }}>Sil</button>
                  </div>

                </div>
              )
            })
          }
          <div>
            <p style={{ textAlign: 'center' }}>Toplam Tutar: {totalAmount} TL </p>
          </div>
        </Drawer >
      </PageContainer>
    </div >
  )
}

export default App