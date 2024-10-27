import Button from '@mui/material/Button'
import { FaAngleDown } from 'react-icons/fa6';
import { useContext } from 'react';
import { Context } from '../ContextProvider/ContenxtProvider';

export default function Country() {
    const { ShowModal, selection } = useContext(Context);
    return (

        <Button onClick={ShowModal} className='country-drop' style={{ marginLeft: '40px' }}>
            <div className='flex flex-col'>
                <span className='location'>Your Location</span>
                <span className='country-name'>{selection}</span>
            </div>
            <span className='ml-auto'>
                <FaAngleDown />
            </span>
        </Button>
    )
}