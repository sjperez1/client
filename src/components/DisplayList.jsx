import React from "react"
import {Link} from "react-router-dom"
import axios from "axios"
// lecture note:
// 1. grab info on load (axios + useEffect)
// 2. store info with useState
const DisplayList = (props) => {
    // all products is an array of objects
    const {removeFromProduct, productlist} = props;
    
    const deleteProduct = (productid) => {
        // need to delete from database and have thet list update in the parent
        axios.delete(`http://localhost:8000/api/products/${productid}`)
            .then(res => {removeFromProduct(productid)})
            .catch(err => console.error(err));
    }
    return (
        <div>
            <h1>All Products: </h1>
            {
                // since productlist is an array of objects, map can be used to go through the array.
                productlist.map((product, i)=>{
                    return(
                        <p key={i}>
                            <Link to={`/products/${product._id}`}>{product.title}</Link> 
                            <Link to={`/products/${product._id}/edit`}>Edit</Link> 
                            <button onClick={() => {deleteProduct(product._id)}}>Delete</button></p>
                    )
                })
            }
        </div>
    )
}

export default DisplayList