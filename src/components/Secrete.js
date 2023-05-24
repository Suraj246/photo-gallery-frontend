import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useCookies } from 'react-cookie'
import axios from 'axios'
import Image from './Image'
import Model from './Model';


const Secrete = () => {
    // const imgURL = 'http://localhost:4000'
    const imgURL = 'https://photo-gallerly-backend.onrender.com'


    const navigate = useNavigate();
    // const [user, setUser] = useState([])
    const [imgUpload, setImgUpload] = useState('')
    const [deleteItem, setDeleteItem] = useState([])
    const [uploadedFile, setUploadedFile] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [modalShow, setModalShow] = useState(false);

    console.log(deleteItem.length)
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
        try {
            await axios.post(`${imgURL}/delete`, deleteItem)

            setRefresh(!refresh)
        } catch (error) {
            alert(error)
        }
    }

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
                const { filename } = res.data
                setUploadedFile(filename)
            })
            setImgUpload('')
            setModalShow(false)
        }
        catch (e) {
            alert(e)
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
                            {deleteItem.length === 0 ? null :
                                <button onClick={multipleDelete} className="deleteButton">Delete Selected Photos</button>
                            }
                        </div>
                        <div>
                            <button className="upload"
                                onClick={() => setModalShow(true)}
                            >
                                <span>+</span>
                                Upload new image
                            </button>
                        </div>
                        <button className="logout" onClick={logOut}>Logout</button>
                    </div>
                </div>
            </div>

            <Model
                show={modalShow}
                onHide={() => setModalShow(false)}
                handlePhotoUpload={handlePhotoUpload}
                imgUpload={imgUpload}
                setImgUpload={setImgUpload}
            />


            <Image uploadedFile={uploadedFile} deleteItem={deleteItem} setDeleteItem={setDeleteItem} modal={modalShow} />
        </>
    );
}

export default Secrete
