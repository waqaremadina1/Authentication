import React, { useState } from 'react'
import { filesize } from 'filesize'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../../config/firebase'

export default function Hero() {

  const [file, setFile] = useState({})
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [downloadURL, setDownloadURL] = useState('')

const handleUpload = () => {
  if(!file?.size){
    console.log("file isn't found");
    return
  }
  
  const fileExt = file.name.split('.').pop();
  // console.log(fileExt);
  
  const randomId = Math.random().toString(36).slice(2)
  // console.log(randomId + '.' + fileExt);
  
  const imagesRef = ref(storage, `images/${randomId}.${fileExt}`)
  const uploadTask = uploadBytesResumable(imagesRef, file);

  setIsUploading(true)
  setDownloadURL('')
  
  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      console.log('Upload is ' + progress + '% done');
      setProgress(progress)
      if(progress === '100'){
        setTimeout(() => {
          setIsUploading(false)
          
        }, 1000);

      }
    },
     (error)=>{
      console.error(error);
      setIsUploading(false)
     },
     () =>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        setDownloadURL(downloadURL)
        setTimeout(() => {
          setIsUploading(false)
        }, 1000);
      });
     })
}

  return (
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className='text-center'>Upload Image</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
          <input type="file" className='form-control' accept='image/*' onChange={e =>{setFile(e.target.files[0]) }}/>
          {file.name && <p className='mb-0'>Name: {file.name} | Size: {filesize(file.size)}</p>}
          {/* {downloadURL && <p className='mb-0'>URl: {downloadURL}</p>} */}
          </div>
        </div>
        {isUploading 
       ? <div className="row mt-3">
          <div className="col">
          <div className="progress" role="progressbar" aria-label="Example with label" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
  <div className="progress-bar" style={{width: `${progress}%`}}>{100}%</div>
</div>
          </div>
        </div>
          : ''

  }
        <div className="row my-3 text-end">
          <div className="col">
            <button className='btn btn-success' onClick={handleUpload} disabled={isUploading}>

              {!isUploading
              ? 'Upload'
             : <div className='spinner-border spinner-border-sm'></div>
             }

            </button>
          </div>
        </div>
          {downloadURL &&
            <div className="row">
            <div className="col text-center">
            <a href={downloadURL} target="_blank" rel="noopener noreferrer" className='btn btn success mb-3'>Download this image</a>        
              <img src={downloadURL} alt="Pic" className='img-fluid'/>
            </div>
          </div>
          }
      </div>
    </div>
  )
}

