import React, { useEffect, useState } from 'react'
import ProductForm from '../components/ProductForm'
import DisplayList from '../components/DisplayList'
import axios from "axios"

const FormList = () => {
    const [productlist, setProductlist] = useState([])

    const updateList =(newProduct) =>{
        setProductlist([...productlist, newProduct])
    }

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/products`)
            .then(res=>setProductlist(res.data))
            .catch(err=>console.log(err))
    },[])

    const removeFromProduct = productid => {
        setProductlist(productlist.filter(product => product._id !== productid));
    }

    return (
        <div>
            <ProductForm updateList={updateList}/>
            <DisplayList productlist={productlist} removeFromProduct={removeFromProduct}/>
        </div>
    )
}

export default FormList