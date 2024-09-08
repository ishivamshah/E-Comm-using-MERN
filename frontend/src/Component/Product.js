import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Product = () => {
    const [allProduct, setAllProduct] = useState([])
    console.log("allProduct", allProduct);
    useEffect(() => {
        getProduct();
    }, [])

    const getProduct = async () => {
        let result = await fetch('http://localhost:5000/products', {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        setAllProduct(result)
    }

    const deleteItem = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'delete',
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = result.json()
        if (result) {
            getProduct();
            alert('Pruduct deleted successfully.')
        }

    }

    const handleSearch = async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result = await result.json()
            if (result) {
                setAllProduct(result)
            }
        } else getProduct();

    }

    return (
        <div>
            <h3>Products</h3>

            <input type='text' className='inputBox' style={{ margin: '0 auto 3%' }} placeholder='Search' onChange={handleSearch} />

            <table>
                <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Company</th>
                    <th>Action</th>
                </tr>
                <tbody>

                    {
                        allProduct.length ? allProduct.map((product, i) => {
                            return (
                                <>
                                    <tr>
                                        <td>{i}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.company}</td>
                                        <td>
                                            <button onClick={() => deleteItem(product._id)}>Delete</button>
                                            <Link to={`/update/${product._id}`}>Edit</Link>
                                        </td>
                                    </tr>
                                </>
                            )
                        }) : <p style={{textAlign: 'center', width: '100%'}}>"No products found."</p>
                    }

                </tbody>
            </table>
        </div>
    )
}

export default Product
