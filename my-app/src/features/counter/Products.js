import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
    selectProducts,
    getProductsAsync,
    addProductAsync,
    selectRefresh,
    delProductAsync,
    updProductAsync,
    selectProductName,
    selectProductDesc,
    selectProductPrice,
    setProductName,
    setProductDesc,
    setProductPrice
} from './productsSlice'
import Pay from '../../Pay';

const Products = () => {
    const products = useSelector(selectProducts)
    const refresh = useSelector(selectRefresh)
    const dispatch = useDispatch()
    const productName = useSelector(selectProductName)
    const productDesc = useSelector(selectProductDesc)
    const productPrice = useSelector(selectProductPrice)


    useEffect(() => {
        dispatch(getProductsAsync())

        return () => {

        }
    }, [refresh, dispatch])

    return (
        <div>
            <div className='add-products'>
                Name <input type='text' value={productName} onChange={(e) => dispatch(setProductName(e.target.value))} />
                Description <input type='text' value={productDesc} onChange={(e) => dispatch(setProductDesc(e.target.value))} />
                Price <input type='number' value={productPrice} onChange={(e) => dispatch(setProductPrice(e.target.value))} />
                <button onClick={() => dispatch(addProductAsync())}>Add Product</button>
            </div>
            <div className='cards'>
                {products.map(product =>
                    <div className='card' key={product.id}>
                        <img className='card-img' src='http://via.placeholder.com/150' alt='product img' />
                        <h2 className='card-title'> {product.pName}</h2>
                        <div className='card-text'>
                            <p>{product.desc}</p>
                            <p>{product.price}$</p>
                            <button onClick={() => dispatch(delProductAsync(product.id))}>Delete</button>
                            <button onClick={() => dispatch(updProductAsync(product.id))}>Update</button>
                            <div style={{ width: '20px', display: 'flex', padding: '10px', margin: '10px' }}><Pay></Pay></div>

                        </div>
                    </div>

                )}
            </div>
        </div>
    )
}

export default Products