import React, { useState, useEffect } from "react"
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
// updateProfile, sendEmailVerification (add in line no: 2)
import { auth } from "../../config/firebase"

const initialState = { email: "", password: "" }

export default function Login() {

    const [state, setState] = useState(initialState)
    const [user, setUser] = useState ({})

    useEffect(()=>{
        
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
            //   const uid = user.uid;
              console.log(user);
              setUser(user)
              // ...
            } else {
              // User is signed out
              console.log('User is logged out');
              // ...
            }
          });
          console.log(auth.currentUser);

    }, [])
  

    const handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(state)

        const { email, password } = state

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("User loggedin successful")
                console.log(userCredential)
                console.log(user)
                window.toastify("User loggedin successful ",'success')
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

   const handleLogout = () => {
    signOut(auth)
    .then(()=>{
        console.log('User logged out')
        window.toastify("User logged out ",'success')
        setUser({})
    })
  
    .catch((error)=>{
        console.error(error);
        window.toastify("error ",'danger')
    })

   }

//    const showAuthUser = () =>{
//     console.log(auth.currentUser)
//     sendEmailVerification(auth.currentUser)
//     .then(() => {
//         console.log('Email sent!')
//         window.toastify("Email sent ",'success')
//         // ...
//       }).catch((error) => {
//         // An error occurred
//         console.error(error);
//         window.toastify("error ",'danger')
//         // ...
//       });
//    }

//    const updateUserProfile = () =>{
    
//    const  user = auth.currentUser

//     updateProfile(user, {
//         displayName: "Waqar Bin Abrar"
//       }).then(() => {
//         console.log('Profile updated!')
//         window.toastify("Profile updated ",'success')
//         // ...
//       }).catch((error) => {
//         // An error occurred
//         console.error(error);
//         window.toastify("error ",'danger')
//         // ...
//       });

//    }

    return (
        <main>
            <div className='py-5 w-100'>
                <div className="container">
                    {user.email 
                   ? <div className="row">
                        <div className="col mx-5 py-4 text-center bg-dark">
                            {/* <h2 className="text-danger mb-4">User Name: {user.displayName}</h2> */}
                            {/* <h2 className="text-danger mb-4">Email Send: {user.sendEmailVerification}</h2> */}
                            <h2 className="text-danger mb-4">User Email: {user.email}</h2>
                            <h2 className="text-danger mb-4">User UID: {user.uid}</h2>
                            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>

                        </div>
                    </div>
                    

                 :
                  
                        <div className="row">
                            <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                <div className="card p-2 p-md-4 p-lg-5">
                                    <h2 className="text-center mb-4">Login Form</h2>
                                    <form onSubmit={handleSubmit}>
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
                                                <button className='btn btn-success w-50'>Login</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </main>
    );
}