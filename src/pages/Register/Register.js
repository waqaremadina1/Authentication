import React, { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../config/firebase"
import { doc, setDoc } from 'firebase/firestore/lite'



const initialState = {fullName: "", email: "", password: "" }

export default function Register() {

    const [state, setState] = useState(initialState)

    const handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        console.log(state)

        const { fullName, email, password } = state

        

    if (fullName.length < 3) {
      return window.toastify("Please enter your full name", "error");
    }
    
    if (password.length < 8) {
      return window.toastify("Password must be at least 6 chars.", "error");
    }

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed up 
                const user = userCredential.user;

                console.log("User registration successful")
                console.log(userCredential)
                console.log(user)
                window.toastify("User registration successful ",'success')


                try {
                await setDoc(doc(firestore, 'users', user.uid), {fullName: '', uid: user.uid })

                }

                catch(e){
                    console.error(e);
                    window.toastify("error ",'danger')
                }
                  // ...
            })

            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                console.error(error)
                window.toastify("error ",'danger')
                // ..
            });
    }

    return (
        <main>
            <div className='py-5 w-100'>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                            <div className="card p-2 p-md-4 p-lg-5">
                                <h2 className="text-center mb-4">Register Form</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <input type="text" className="form-control" placeholder="Full Name" name='fullName' onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <input type="email" className="form-control" placeholder="Email" name='email' onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <input type="password" className="form-control" placeholder="Password" name='password' onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col text-center">
                                            <button className='btn btn-danger w-50'>Register</button>
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


