import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Form, Button, Tabs, Tab, } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import { AddFieldModal } from '../../../commonpages/AddFieldModal';

import { UploadFile } from '../../../components/UploadFile';
import { deleteUserGear_API, deleteUserQualification_API, getRollsAll_API,  update_modal_account_api } from '../../../api_services/Apiservices';
import { errorAlert, successAlert } from '../../../components/Alert';
import { useNavigate } from 'react-router-dom';
import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import moment from 'moment';
import Swal from 'sweetalert2';



export const EditAdminstratorForm = ({ setLoder, pre, grdata, quadata }) => {
    const [fields, setFields] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isdelete, setIsdelete] = useState(false);
    const navigate = useNavigate();
    const [rolelist, setRolelist] = useState([]);
    const [isedit, setIsedit] = useState(false);
    const [premain, setPremain] = useState();

    const [indata, setIndata] = useState({
        "first_name": "", "last_name": "",
        "start_date": "", "email": "",
        "supervisor": "", "role": "",
        "position": "", "address_1": "",
        "address_2": "", "city": "",
        "state": "", "zip_code": "",
        "term_date": "", "image": "",
        "phone_no": "", "emergency_contact_name": "",
        "emergency_contact_number": "", "status": ""
    });


    const getrolls = async () => {
        const resp = await getRollsAll_API();
        if (resp) {
            const findata = resp.data;
            const mydata = findata.map(e => ({ name: e.role, value: e._id }));
            setRolelist(mydata);
        }
    }

    useEffect(() => { getrolls(); }, []);

    useEffect(() => {
        if (pre) {
            let roleId = "";
            if (pre.role && pre.role.role) {
                roleId = pre.role && pre.role.role;
            }
            setPremain(pre);
            setIndata({
                "id": pre._id,
                "first_name": pre.first_name, "last_name": pre.last_name,
                "start_date": pre.start_date, "email": pre.email,
                "supervisor": pre.supervisor, "role": roleId,
                "position": pre.position, "address_1": pre.billing_address,
                "address_2": pre.billing_addres2, "city": pre.city,
                "state": pre.state, "zip_code": pre.zip_code,
                "term_date": pre.term_date, "image": "", "preimage": pre.image,
                "phone_no": pre.mobile_no, "emergency_contact_name": pre.emergency_contact_name,
                "emergency_contact_number": pre.emergency_contact_number, "status": pre.status,
                "add_field": pre.add_field,
                "password": pre.password,
            });
            setFields(pre.add_field);
        }
    }, [pre])

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


    const [error, setError] = useState({
        "first_name": "", "last_name": "",
        "start_date": "", "email": "",
        "supervisor": "", "role": "",
        "position": "", "address_1": "",
        "address_2": "", "city": "",
        "state": "", "zip_code": "",
        "term_date": "", "image": "",
        "phone_no": "", "emergency_contact_name": "",
        "emergency_contact_number": "", "status": ""
    });

    const handleAddField = (title, placeholder) => {
        setFields([...fields, { title, placeholder }]);
    };

    const imageHanlder = (data) => {
        const { name, value } = data;
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }


    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = async (e) => {

        e.preventDefault();
        // Validate each field
        let isValid = true;
        if (!indata.first_name) { setError(prev => ({ ...prev, "first_name": "First Name is required" })); isValid = false; }
        if (!indata.last_name) { setError(prev => ({ ...prev, "last_name": "Last Name is required" })); isValid = false; }
        if (!indata.start_date) { setError(prev => ({ ...prev, "start_date": "Start Date is required" })); isValid = false; }
        if (!indata.email) { setError(prev => ({ ...prev, "email": "Email is required" })); isValid = false; }
        if (!indata.supervisor) { setError(prev => ({ ...prev, "supervisor": "Supervisor is required" })); isValid = false; }
        if (!indata.role) { setError(prev => ({ ...prev, "role": "Role is required" })); isValid = false; }
        if (!indata.position) { setError(prev => ({ ...prev, "position": "Position is required" })); isValid = false; }
        if (!indata.address_1) { setError(prev => ({ ...prev, "address_1": "Address 1 is required" })); isValid = false; }
        if (!indata.city) { setError(prev => ({ ...prev, "city": "City is required" })); isValid = false; }
        if (!indata.state) { setError(prev => ({ ...prev, "state": "State is required" })); isValid = false; }
        if (!indata.term_date) { setError(prev => ({ ...prev, "term_date": "Term Date is required" })); isValid = false; }
        if (!indata.zip_code) { setError(prev => ({ ...prev, "zip_code": "Zip Code is required" })); isValid = false; }
        if (!indata.phone_no) { setError(prev => ({ ...prev, "phone_no": "Phone Number is required" })); isValid = false; }
        if (!indata.emergency_contact_name) { setError(prev => ({ ...prev, "emergency_contact_name": "Emergency Contact Name is required" })); isValid = false; }
        if (!indata.emergency_contact_number) { setError(prev => ({ ...prev, "emergency_contact_number": "Emergency Contact Number is required" })); isValid = false; }
        if (!indata.status) { setError(prev => ({ ...prev, "status": "Status is required" })); isValid = false; }
        // If all fields are valid, submit the form
        if (isValid) {

            setLoder(true);

            const formData = new FormData();
            formData.append('checkUserType', 2);
            formData.append('id', indata.id);
            formData.append('create_by_id', localStorage.getItem('id'));
            formData.append('first_name', indata.first_name);
            formData.append('last_name', indata.last_name);
            formData.append('start_date', indata.start_date);
            formData.append('email', indata.email);
            formData.append('supervisor', indata.supervisor);
            formData.append('role', indata.role);
            formData.append('position', indata.position);
            formData.append('billing_address', indata.address_1);
            formData.append('billing_addres2', indata.address_2);
            formData.append('city', indata.city);
            formData.append('state', indata.state);
            formData.append('zip_code', indata.zip_code);
            formData.append('term_date', indata.term_date);
            formData.append('image', indata.image);
            formData.append('mobile_no', indata.phone_no);
            formData.append('emergency_contact_name', indata.emergency_contact_name);
            formData.append('emergency_contact_number', indata.emergency_contact_number);
            formData.append('status', indata.status);
            formData.append('add_field', fields);

            const resp = await update_modal_account_api(formData);
            if (resp && resp.success) {
                e.target.reset();
                setFields([]);
                setLoder(false);
                successAlert(resp.message);
                navigate("/adminstratorprofilelist");
            }
            setLoder(false);
        }
    };


    const deleteHandler = (id) => {
        if (!id) { errorAlert("Something wrong"); return; }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const fadat = {
                    "id": id,
                    "is_delete": 'yes'
                }
                const resp = await update_modal_account_api(fadat);
                if (resp && resp.success) {
                    setLoder(false);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Data has been deleted.",
                        icon: "success"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            navigate("/adminstratorprofilelist");
                        }
                    })
                }
            }
        });
    }


    const deleteUserGear = (id) => {
        if (!id) { errorAlert("Something wrong"); return; }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const fadat = { "id": id, }
                const resp = await deleteUserGear_API(fadat);
                if (resp && resp.success) {
                    setLoder(false);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Data has been deleted.",
                        icon: "success"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            navigate("/adminstratorprofilelist");
                        }
                    })
                }
            }
        });
    }


    
    const deleteUserQualificationHandler = (id) => {
        if (!id) { errorAlert("Something wrong"); return; }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const fadat = { "id": id, }
                console.log("----------",id);
                const resp = await deleteUserQualification_API(fadat);
                if (resp && resp.success) {
                    setLoder(false);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Data has been deleted.",
                        icon: "success"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            navigate("/adminstratorprofilelist");
                        }
                    })
                }
            }
        });
    }



    return (
        <>
            {isedit ?
                <>
                    <div className='CreateAccountForm mt-3'>
                        <Container>
                            <Form onSubmit={handleSubmit}>
                                <Row style={{ justifyContent: "space-between" }}>
                                    <Col md={6}>
                                    </Col>
                                    <Col md={1}>
                                        <Button variant="success" size="sm"
                                            onClick={() => setIsedit(false)} style={{
                                                fontWeight: '500'
                                            }}>Not Update
                                        </Button>
                                    </Col>
                                </Row>
                                <Row className='mb-2 mt-3'>
                                    <Col md={4}>
                                        <InputField FormType={'text'} FormLabel={"First Name"} onChange={inputHandler} error={error.first_name} value={indata.first_name} name='first_name' FormPlaceHolder={"Jenny"} />
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'text'} FormLabel={"Last Name"} onChange={inputHandler} error={error.last_name} value={indata.last_name} name='last_name' FormPlaceHolder={"Wilson"} />
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'email'} FormLabel={"Email"} onChange={inputHandler} readOnly={true} error={error.email} value={indata.email} name='email' FormPlaceHolder={"example@gmail.com"} />
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'tel'} FormLabel={"Phone No"} max='10' onChange={inputHandler} error={error.phone_no} value={indata.phone_no} name='phone_no' FormPlaceHolder={"8989898989"} />
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'text'} FormLabel={"Role"} readOnly={true} onChange={inputHandler} value={indata.role} name={'role'} />
                                    </Col>
                                </Row>
                                <hr />
                                <Row className='mb-2'>
                                    <Col md={4}>
                                        <SharedButton type={'submit'} BtnLabel={"Update"} BtnVariant={'primary'} BtnClass={"w-100"} />
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    </div>
                </>
                :
                <>
                    <div className='CreateAccountForm UseDetailPages mt-3'>
                        <Container>
                            <Row className="my-3" style={{ justifyContent: "end" }}>
                                <Col md={2}>
                                    <Button variant="success" size="sm" className='m-2'
                                        onClick={() => setIsedit(true)} style={{
                                            fontWeight: '500',

                                        }}><TbEdit />
                                    </Button>
                                    <Button variant="danger" size="sm"
                                        onClick={() => deleteHandler(indata.id)} style={{
                                            fontWeight: '500'
                                        }}><RiDeleteBinLine />
                                    </Button>
                                </Col>
                            </Row>
                            <Row className='mb-5 mt-3'>
                                <Col md={4}>
                                    <h6>First Name</h6>
                                    <p>{indata.first_name}</p>
                                </Col>
                                <Col md={4}>
                                    <h6>Last Name</h6>
                                    <p>{indata.last_name}</p>
                                </Col>
                                <Col md={4}>
                                    <h6>Email</h6>
                                    <p>{indata.email}</p>
                                </Col>
                                <Col md={4}>
                                    <h6>Phone No</h6>
                                    <p>{indata.phone_no}</p>
                                </Col>
                                <Col md={4}>
                                    <h6>Role</h6>
                                    <p>{indata.role}</p>
                                </Col>
                                <Col md={4}>
                                    <h6>Status</h6>
                                    <p>{indata.status}</p>
                                </Col>
                                {premain && premain.add_field && premain.add_field.map((e, i) => (
                                    <Col md={4} key={i}>
                                        <h6>{e.title}</h6>
                                        <p>{e.value}</p>
                                    </Col>

                                ))}
                            </Row>
                        </Container>
                    </div>
                </>
            }
        </>
    )
}
