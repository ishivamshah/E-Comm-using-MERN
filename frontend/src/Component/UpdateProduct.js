import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateProduct = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [company, setCompany] = useState("")
    const params = useParams()
    const [allProduct, setAllProduct] = useState([])
    const auth = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()

    useEffect(() => {
        getProduct()
    }, [])

    const getProduct = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        setAllProduct(result)
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }

    const editProduct = async () => {
        console.log(name, price, category, company);
        let result = await fetch(`http://localhost:5000/product/${params.id}`,
            {
                method: 'put',
                body: JSON.stringify({ name, price, category, company, userId: auth._id }),
                headers: { 'Content-Type': 'application/json', authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}` }
            }
        )
        result = result.json()
        if(result) alert("Product updated successfully."); navigate('/')
    }

    return (
        <div className='register'>
            <h3>Update Product</h3>
            <input className='inputBox' type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' />
            <input className='inputBox' type='text' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter Price' />
            <input className='inputBox' type='text' value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Enter Category' />
            <input className='inputBox' type='text' value={company} onChange={(e) => setCompany(e.target.value)} placeholder='Enter Company' />
            <button onClick={editProduct} className='appButton' type='button'>SAVE</button>
        </div>
    )
}

export default UpdateProduct