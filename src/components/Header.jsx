import React, { use } from 'react'
import '../css/Header.css'
import { FaShoppingBasket } from "react-icons/fa";
import { MdLight } from "react-icons/md";
import { IoMoon } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setDrawerOpen } from '../redux/slices/basketSlice';
import logo from '../images/logo.png';

function Header() {
    const [theme, setTheme] = React.useState('false')
    const navigate = useNavigate()
    const dispatch = useDispatch();


    const changeTheme = () => {
        const root = document.getElementById('root');
        if (theme) {
            root.style.backgroundColor = 'black'
            root.style.color = 'white'
        } else {
            root.style.backgroundColor = 'white'
            root.style.color = 'black'
        }
        setTheme(!theme)

    }
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }} >
            <div className='flex-row' onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <img className='logo' src={logo} alt="Logo" />                <p className='logo-text'>H Trade</p>
            </div>

            <div className='flex-row' >
                <input className='search-input' type="text" placeholder='Arama Yap' />
                <div>
                    {theme ? <IoMoon className='icon' onClick={changeTheme} /> : <MdLight className='icon' onClick={changeTheme} />}

                    <Badge onClick={() => dispatch(setDrawerOpen())} badgeContent={useSelector((store) => store.basket.products.length)} color='error'>
                        <FaShoppingBasket className='icon' style={{ marginRight: '5px' }} />
                    </Badge>

                </div>
            </div>

        </div >
    )
}

export default Header