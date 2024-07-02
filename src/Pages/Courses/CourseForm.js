import React, { useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { InputField } from '../../components/InputField'
import { SharedButton } from '../../components/Button';
import { AddFieldModal } from '../../commonpages/AddFieldModal';
import { Textareanew } from '../../components/Textareanew';
import { createTraning_API } from '../../api_services/Apiservices';
import { errorAlert, successAlert } from '../../components/Alert';
import { useNavigate } from 'react-router-dom';
import { UploadFile } from '../../components/UploadFile';


export const CourseForm = ({ setLoder }) => {
    const [fields, setFields] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [indata, setIndata] = useState({ "trname": "", "description": "" });
    const [error, setError] = useState({ "trname": "", "description": "" });
    const navigate = useNavigate();

    const addNewHandler = (e) => {
        const { name, value } = e.target;
        const field = [...fields];
        const index = field.findIndex((item) => item.title === name);
        if (index !== -1) {
            field[index] = {
                ...field[index],
                value: value
            };
        }
        setFields(field);
    }

    const handleAddField = (title, placeholder) => {
        setFields([...fields, { title, placeholder }]);
    };

    const inputHandler = async (e) => {
        const { name, value } = e.target;
        setIndata(prev => ({ ...prev, [name]: value }));
    }

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        let isValid = true;
        if (!indata.trname) { setError(prev => ({ ...prev, "trname": "Required" })); isValid = false; }
        if (!indata.description) { setError(prev => ({ ...prev, "description": "Required" })); isValid = false; }

        if (isValid) {
            setLoder(true);
            const final = {
                name: indata.trname,
                description: indata.description,
                add_field: fields
            }

            const resp = await createTraning_API(final);
            if (resp && resp.success) {
                e.target.reset();
                setIndata([]);
                setFields([]);
                setLoder(false);
                successAlert(resp.message);
                navigate("/traininglist");
            }
            setLoder(false);

        }


    }
    return (

        <>
            <div className='TrainingForm'>
                <Container fluid>
                    <Form onSubmit={submitHandler}>
                        <Row>
                            <Col md={2}>
                                <UploadFile
                                    FormLabel="Upload"
                                    name="image"
                                    controlId="formProfilePic"
                                    // onChange={imageHanlder}
                                />
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Course Name"} FormPlaceHolder={"Enter Course Name"} name='trname' error={error.trname} value={indata.trname} onChange={inputHandler} />
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Col md={4}>
                                <SharedButton BtnLabel={"Create"} BtnVariant={'primary'} BtnClass={"w-100"} />
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        </>

    )
}
