import React, { useState } from 'react'
import FileDownload from 'js-file-download'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';

const Image = ({ uploadedFile, deleteItem, setDeleteItem, modal }) => {
    const [bigImage, setBigImage] = useState('')

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const imgURL = 'http://localhost:4000'
    const imgURL = 'https://photo-gallerly-backend.onrender.com'



    const previewImage = (img) => {
        setBigImage(img)
        // setModalShow(true)
        handleShow()
    }

    const downloadImage = (img) => {
        axios(`${imgURL}/api/getimage/${img}`, { method: 'GET', responseType: "blob" })
            .then((res) => {
                FileDownload(res.data, `${img}.png`)
            })
    }

    return (
        <>
            <div className='image-container'>

                {uploadedFile?.length === 0 &&

                    <img src="\uploads\noImg.jpg" alt="" className='up-back' loading='lazy' />
                }
                {uploadedFile.map((elem, idx) => {
                    const dot = '.'
                    const title = []
                    for (let i = 0; i < elem?.title?.length; i++) {
                        if (elem.title[i] === dot) {
                            title.push(elem.title.slice(0, i))
                        }

                    }
                    return (


                        <div key={idx} className={modal ? "image-upload ig" : "image-upload"}>
                            <div className="img-uploaded">
                                <img src={`${imgURL}/uploads/${elem.profile}`} alt={title}
                                    loading='lazy'
                                />
                                <i className='bx bx-show bx-sm bigImage' onClick={() => previewImage(elem.profile)} />
                                <i className='bx bxs-cloud-download bx-sm downloadImg'
                                    onClick={() => downloadImage(elem.profile)}
                                />
                            </div>
                            <div className="img-info">
                                <span>{title}</span>
                                <span>{elem.type}</span>
                            </div>

                            {modal ?
                                null :
                                <input type="checkbox" id="deletePhoto" className='larger' onChange={(e) => {
                                    if (e.target.checked === true) {
                                        setDeleteItem([...deleteItem, elem._id])
                                    }
                                    else {
                                        setDeleteItem(deleteItem.filter(s => s !== elem._id))
                                    }
                                }
                                } />
                            }
                        </div>
                    )
                })}

                <Modal show={show} onHide={handleClose}
                    size="lg"
                    centered
                >
                    <Modal.Body>
                        {!bigImage ? "loading" :
                            <img src={`${imgURL}/uploads/${bigImage}`} alt="img" loading='lazy'
                                style={{ width: '100%', height: '90%', objectFit: "contain" }}
                            />
                        }
                    </Modal.Body>
                </Modal>

            </div>
        </>
    )
}

export default Image
