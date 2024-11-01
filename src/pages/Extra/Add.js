import React, { useState } from "react"
import { collection, addDoc, doc, setDoc } from "firebase/firestore/lite";
import { firestore } from "../../config/firebase";

const initialState = { title: "", description: "", price: "" }

export default function Add() {

    const [state, setState] = useState(initialState)

    const handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(state)

        let { title, description, price } = state

        title = title.trim()
        description = description.trim()
        price = Number(price)

        if (title.length < 3) {
            window.toastify("title must be 3 chr ",'danger')
            return;
        }
        if (description.length < 10) {
            window.toastify("description must be 10 chr ",'danger')
            return;
        }
        if (!price || price < 0) {
            window.toastify("price must be 1 ",'danger')
            return;
        }

        let formData = { title, description, price }

        try {
            const docRef = await addDoc(collection(firestore, "products"), formData);
            console.log("Document written with ID: ", docRef.id);
            window.toastify("Product added successful ",'success')
        } catch (e) {
            console.error("Error adding document: ", e);
            window.toastify("error ",'danger')
        }
    }

    

    return (
        <main>
            <div className='py-5 w-100'>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                            <div className="card p-2 p-md-4 p-lg-5">
                                <h2 className="text-center mb-4">Add Product Form</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <input type="text" className="form-control" placeholder="Title" name='title' onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <input type="text" className="form-control" placeholder="Description" name='description' onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <input type="number" className="form-control" placeholder="Price" name='price' onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col text-center">
                                            <button className='btn btn-outline-success w-50'>Add User</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}