import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
const Model = (props) => {

    const upload = (e) => {
        props.setImgUpload(e.target.files[0])
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Upload Image
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="img-container">
                    {props.imgUpload ?
                        <img src={URL.createObjectURL(props.imgUpload)} alt="img" width={100} height={100} /> : ''
                    }
                    <Form encType="multipart/form-data" onSubmit={props.handlePhotoUpload}>
                        <Form.Control type="file" name="image" id="myfile" onChange={upload} />
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.handlePhotoUpload}>Upload</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Model
