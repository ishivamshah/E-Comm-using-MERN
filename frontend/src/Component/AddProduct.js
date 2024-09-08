import React, { useState } from 'react'

const AddProduct = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [company, setCompany] = useState("")
    const [error, setError] = useState(false)

    const auth = JSON.parse(localStorage.getItem("user"))

    const addProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true)
            return false
        }
        let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId: auth._id }),
            headers: { 'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
             }
        })
        result = await result.json()
        if(result) {
            setName('')
            setPrice('')
            setCategory('')
            setCompany('')
        }
    }

    return (
        <div className='register'>
            <h3>Add Product</h3>
            <input className='inputBox' type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' />
            {error && !name && <span className='input-error'>Enter valid name</span> }
            <input className='inputBox' type='text' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter Price' />
            {error && !price && <span className='input-error'>Enter valid price</span> }
            <input className='inputBox' type='text' value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Enter Category' />
            {error && !category && <span className='input-error'>Enter valid category</span> }
            <input className='inputBox' type='text' value={company} onChange={(e) => setCompany(e.target.value)} placeholder='Enter Company' />
            {error && !company && <span className='input-error'>Enter valid company</span> }
            <button onClick={addProduct} className='appButton' type='button'>ADD</button>
        </div>
    )
}

export default AddProduct