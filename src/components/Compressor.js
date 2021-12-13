import './css/Compressor.css'
import React, { useState } from "react";
import imageCompression from 'browser-image-compression';

const Compressor = () => {

    const [origImage, setOrigImage] = useState('')
    const [origImageFile, setOrigImageFile] = useState('')
    const [compressedImage, setCompressedImage] = useState('')
    const [fileName, setFileName] = useState('')

    const handle = (e) => {
        const imageFile = e.target.files[0]
        setOrigImage(imageFile)
        setOrigImageFile(URL.createObjectURL(imageFile))
        setFileName(imageFile.name)
    }

    const handelCompressImage = (e) => {
        e.preventDefault()

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 500,
            useWebWorker: true
        }

        if(options.maxSizeMB >= origImage/1024){
            alert("Image is too small, can't be compressed")
            return 0;
        }

        let output;
        imageCompression(origImage,options)
        .then((x) => {
            output = x

            const downloadLink = URL.createObjectURL(output)
            setCompressedImage(downloadLink)
        })
    }

    return(
        <div className='container'>
            <div className='leftDiv'>
                {
                origImage ? (
                    <img src={ origImageFile } className='image_preview' alt='' />
                ) : (
                    <img src="https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=" className='image_preview' alt='' />
                )}
                <div className='browseDiv'>
                    <input type='file' onChange={(e) => handle(e)} id='browseBtn ' />
                </div>
            </div>
            <div className='compressDiv'>
                { origImage && <button className='compressBtn' onClick={(e) => handelCompressImage(e)}>Compress</button> }
            </div>
            <div className='rightDiv'>
                {
                    compressedImage ? (
                        <img alt='' src={compressedImage} />
                    ) : (
                        <img alt='' src="https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=" />
                    )
                }
                <div>
                    {compressedImage && <button id='downloadBtn'>
                        <a style={{textDecoration: 'none'}} href={compressedImage} download={fileName}>Download Image</a>
                        </button>}
                </div>
            </div>
        </div>
    )
}

export default Compressor