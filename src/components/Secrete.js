import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useCookies } from 'react-cookie'
import axios from 'axios'
import "./Model/Model.css";
import Image from './Image'

const Secrete = () => {
    const imgURL = 'http://localhost:4000'
    // const imgURL = 'https://photogallery-backend.onrender.com'


    const navigate = useNavigate();
    // const [user, setUser] = useState([])
    const [modal, setModal] = useState(false);
    const [imgUpload, setImgUpload] = useState('')
    const [deleteItem, setDeleteItem] = useState([])
    const [uploadedFile, setUploadedFile] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect((e) => {
        const fetch = async () => {
            await axios.get(`${imgURL}/api/getimage`)
                .then((res) => {
                    setUploadedFile(res.data.data)
                })
        }
        fetch()
    }, [uploadedFile])


    const multipleDelete = async () => {
        await axios.post(`${imgURL}/delete`, deleteItem)
            .then((res) => {
                console.log(res)
            })
            .then((err) => console.log(err))
        setRefresh(!refresh)
    }

    const toggleModal = () => {
        setModal(!modal);
    };

    // following commented code is practice code nothing to do with main code

    // const [cookies, setCookie, removeCookie] = useCookies([]);

    // const verifyUser = async () => {
    //     if (!cookies.jwt) {
    //         navigate("/signin");
    //     } else {
    //         const { data } = await axios.post(
    //             "http://localhost:4000/",
    //             {},
    //             {
    //                 withCredentials: true,
    //             }
    //         );
    //         if (!data.status) {
    //             removeCookie("jwt");
    //             navigate("/signin");
    //         }

    //         else {
    //             setUser(data)
    //         }
    //     }
    // };
    // useEffect(() => {
    //     verifyUser();
    // }, [cookies, navigate, removeCookie]);

    const logOut = () => {
        // removeCookie("jwt");
        localStorage.removeItem("iduser");
        navigate("/signin");
    };

    useEffect(() => {
        if (!localStorage.getItem("iduser")) {
            navigate("/signin")
        }
    })

    const upload = (e) => {
        setImgUpload(e.target.files[0])
    }
    const handlePhotoUpload = (e) => {
        const url = `${imgURL}/api/image`
        const formData = new FormData();
        formData.append('image', imgUpload)
        try {
            axios.post(url, formData,
                {
                    header: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then((res) => {
                console.log(res.data)
                const { filename } = res.data
                console.log(filename)
                setUploadedFile(filename)
            })
            setImgUpload('')
            toggleModal()
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <>

            <div className="private">
                {/* <ToastContainer /> */}
                <div className="media-library">
                    <div className="img-count">
                        <span className="img-head">Media Library</span>
                        <span>Available Photos : {uploadedFile.length}</span>
                    </div>
                    <div className="media-right">
                        <div className="deleteItems">
                            {deleteItem.length > 0 ?
                                <button onClick={multipleDelete} className="deleteButton">Delete Selected Photos</button>
                                :
                                null
                            }
                        </div>
                        <div>
                            <button className="upload" onClick={toggleModal}>
                                <span>+</span>
                                Upload new image
                            </button>
                        </div>
                        <button className="logout" onClick={logOut}>Logout</button>
                    </div>
                </div>
            </div>
            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title">Upload new images</p>
                            <span className="close-modal" onClick={toggleModal} >
                                CLOSE
                            </span>
                        </div>
                        <div>
                            <div className="img-container">
                                <div>
                                    <img src={imgUpload === '' ? null : URL.createObjectURL(imgUpload)} alt="" width="100" height="100" />
                                </div>
                                <div>
                                    <form encType="multipart/form-data" onSubmit={handlePhotoUpload}>
                                        <input type="file" name="image" id="myfile" onChange={upload} />
                                    </form>
                                </div>
                            </div>
                            <div className="btn-upload-container">
                                <button className="btn-upload" onClick={handlePhotoUpload}>Upload</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }

            <Image uploadedFile={uploadedFile} deleteItem={deleteItem} setDeleteItem={setDeleteItem} modal={modal} />
        </>
    );
}

export default Secrete
