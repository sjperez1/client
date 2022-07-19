import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from "react-router-dom"
import axios from "axios"
// nptes from lecture:
// pre-populated form
// 1. grab id from params (useParams)
// 2. display info on load (useEffect)
// 3. input : useState
// 4. grab info from backend: axios

const Update = () => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState(5)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
        .then(res => {
            const product = res.data
            setTitle(product.title)
            setPrice(product.price)
            setDescription(product.description)
        })
        .catch(err => console.log(err))
    }, [])

    const handleSubmit =(e) =>{
        e.preventDefault()
        // need to give for the req.body in the update function in the backend controller.
        axios.put(`http://localhost:8000/api/products/${id}/edit`, {title, price, description})
            .then(res=>navigate("/"))
            .catch(err=>console.log(err))
    }

return (
    <div>
        {/* The prepopualted form works because above the different form requests are set based on pulling from the database, so the value on each input has a preexisting value to populate the form. */}
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
            <button type="submit">Update</button>
            <Link to={`/`}>Return to Main Page</Link> 
        </form>
    </div>
    )
}

export default Update