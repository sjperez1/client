import React, { useState } from 'react'
import axios from "axios"

// 1. input: useState
// 2. axios
// optional: redirect: useNavigate

const ProductForm = (props) => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")


    const handleSubmit =(e) =>{
        e.preventDefault()
        // post the new to the backend
        axios.post(`http://localhost:8000/api/products`, {title, price, description})
            .then(res=>props.updateList(res.data))
            .catch(err=>console.log(err))
        // reset the form so that the form clears on submission
        setTitle("")
        setPrice("")
        setDescription("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label> Title </label>
                <input type="text" name="title" value={title} onChange={(e)=>setTitle(e.target.value)} />
            </div>
            <div>
                <label> Price </label>
                <input type="number" name="price" value={price} onChange={(e)=>setPrice(e.target.value)} />
            </div>
            <div>
                <label> Description </label>
                <input type="text" name="description" value={description} onChange={(e)=>setDescription(e.target.value)} />
            </div>
            <button type="submit">Create</button>
        </form>
    )
}

export default ProductForm