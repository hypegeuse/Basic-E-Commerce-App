import React, { useEffect, useState } from 'react'; // 1. useState eklendi
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setSelectedProduct } from '../redux/slices/productSlice';
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { addProductToBasket, calculateBasket } from '../redux/slices/basketSlice'
function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();

    // Redux'tan verileri çekiyoruz
    const { products, selectedProduct } = useSelector((store) => store.product);

    // 2. useState kullanımı düzeltildi: [deger, fonksiyon]
    const [count, setCount] = useState(1);

    useEffect(() => {
        if (products && products.length > 0 && id) {
            const product = products.find((p) => String(p.id) === String(id));
            if (product) {
                dispatch(setSelectedProduct(product));
            }
        }
    }, [id, products, dispatch]);

    // Miktar artırma/azaltma fonksiyonları
    const increment = () => setCount(count + 1);
    const decrement = () => {
        if (count > 1) setCount(count - 1);
    };

    // Sepete ekleme fonksiyonu (Burada kendi basketSlice'ını tetikleyebilirsin)
    const addBasket = (product) => {
        const payload = {
            id,
            price,
            image,
            title,
            description,
            count
        }
        dispatch(addProductToBasket(payload));
        dispatch(calculateBasket());

    }

    if (!selectedProduct || Object.keys(selectedProduct).length === 0) {
        return (
            <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'arial' }}>
                <h2>Ürün hazırlanıyor...</h2>
            </div>
        );
    }

    const { title, price, description, image } = selectedProduct;

    return (
        <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ marginRight: '40px' }}>
                <img src={image} width={300} height={400} alt={title} style={{ objectFit: 'contain' }} />
            </div>

            <div style={{ maxWidth: '600px' }}>
                <h1 style={{ fontFamily: 'arial' }}>{title}</h1>
                <p style={{ fontFamily: 'arial', fontSize: '20px', color: '#444' }}>{description}</p>
                <h1 style={{ fontSize: '50px', fontFamily: 'arial', fontWeight: 'bold', color: 'rgb(185, 76, 76)' }}>
                    {price} ₺
                </h1>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <CiSquareMinus onClick={decrement} style={{ fontSize: '40px', cursor: 'pointer' }} />
                    <span style={{ fontSize: '30px', margin: '0 15px' }}>{count}</span>
                    <CiSquarePlus onClick={increment} style={{ fontSize: '40px', cursor: 'pointer' }} />
                </div>

                <div>
                    <button
                        onClick={addBasket}
                        style={{
                            marginTop: '20px',
                            border: 'none',
                            padding: '15px 40px',
                            backgroundColor: 'rgb(185, 76, 76)', // Renk biraz daha uyumlu yapıldı
                            borderRadius: '5px',
                            cursor: 'pointer',
                            color: '#fff',
                            fontSize: '18px'
                        }}>
                        Sepete Ekle
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;