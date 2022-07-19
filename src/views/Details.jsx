import React, {useEffect, useState} from 'react'
import axios from "axios"
import {useParams, useNavigate, Link} from "react-router-dom"
// notes from lecture:
// 1. get id from params (useParams)
// 2. display info on load (useEffect)
// 3. for the info: useState
// 4. grab info from backend : axios
const Details = () => {
    const [product, setProduct] = useState()
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/products/${id}`)
        .then(res=>setProduct(res.data))
        .catch(err=>console.log(err))
    },[])

    const deleteProduct = () => {
        // can get id from params for the link rather than sending something to the function at the button.
        axios.delete(`http://localhost:8000/api/products/${id}`)
            .then(res => {navigate("/")})
            .catch(err => console.error(err));
    }

    return (
        <div>
            {
                product?
                <div>
                    <h2>{product.title}</h2>
                    <p>Price: {product.price}</p>
                    <p>Description: {product.description}</p>
                    <button onClick={deleteProduct}>Delete</button>
                    <Link to={`/`}>Return to Main Page</Link> 
                </div>:
                <h1>The product is unavailable at this time.</h1>
            }
        </div>
    )
}

export default Details