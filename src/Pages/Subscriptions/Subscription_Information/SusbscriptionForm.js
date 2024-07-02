import React, { useState } from 'react'
import { Container, Row, Col, Stack, Form } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import { AddFieldModal } from '../../../commonpages/AddFieldModal';
import Select from '../../../components/Select';
import { Radio } from '../../../components/Radio';
import { Textareanew } from '../../../components/Textareanew';
import { createQualification_API } from '../../../api_services/Apiservices';
import { successAlert } from '../../../components/Alert';
import { useNavigate } from 'react-router-dom';
import { SelectDropdown } from '../../../components/SelectDropdown';


export const SusbscriptionForm = ({ setLoder }) => {
    const [fields, setFields] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const [indata, setIndata] = useState({ "name": "", "type": "", "description": "" });
    const [error, setError] = useState({ "name": "", "type": "", "description": "" });

    const handleAddField = (title, placeholder) => {
        setFields([...fields, { title, placeholder }]);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);


    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }

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

    const submitHandler = async (e) => {
        e.preventDefault();
        let isValid = true;
        if (!indata.name) { setError((pre) => ({ ...pre, "name": "Required" })); isValid = false; }
        if (!indata.type) { setError((pre) => ({ ...pre, "type": "Required" })); isValid = false; }
        if (!indata.description) { setError((pre) => ({ ...pre, "description": "Required" })); isValid = false; }

        if (isValid) {
            const fdata = {
                "name": indata.name,
                "type": indata.type,
                "description": indata.description,
                "add_field":fields
            }
            const resp = await createQualification_API(fdata);
            if (resp && resp.success) {
                e.target.reset();
                setIndata([]);
                setFields([]);
                setLoder(false);
                successAlert(resp.message);
                navigate("/qualificationlist");
            }
        }
        setLoder(false);
    }


    return (
        <>
            <div className='TrainingForm bgWhite mt-3'>
                <Container fluid>
                    <Form onSubmit={submitHandler}>
                        <Row>
                            <Col md={4} className='mb-2'>
                                <InputField FormType={'text'} FormLabel={"Plan Name"} FormPlaceHolder={"Plan Name"} name='name' error={error.name} onChange={inputHandler} />
                            </Col>
                            <Col md={4} className='mb-2'>
                            {/* <Select FormLabel={'Select Platform'}/> */}
                            <SelectDropdown FormLabel={'Select Course'}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <SharedButton type={'submit'} BtnLabel={"Create Plans"} BtnVariant={'primary'} BtnClass={"w-100"} />
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        </>
    )
}
