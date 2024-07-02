import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { InputField } from '../../components/InputField'
import { CheckBoxButton } from '../../components/CheckBoxButton'
import { SharedButton } from '../../components/Button'
import { errorAlert, successAlert } from '../../components/Alert'
import { create_rolls } from '../../api_services/Apiservices'
import { useNavigate } from 'react-router-dom'
import Select from '../../components/Select'

export const CreateRoleForm = ({ setLoder }) => {
    const navigate = useNavigate();
    const [fdata, setFdata] = useState({
        "plans": "",
        "User_Profile_Module": false,
        "Course": false,
        "Vendor": false,
        "Exam": false,
        "Qualification_Module": false,
        // "Reporting_Module": false
    });

    const moduleList = [
        { id: 1, name: 'Plans', value: "plans" },
        { id: 5, name: 'User Profile', value: "User_Profile_Module" },
        { id: 4, name: 'Course', value: "Course" },
        { id: 2, name: 'Vendor', value: "Vendor" },
        { id: 3, name: 'Exam', value: "Exam" },
        // { id: 6, name: 'Reporting', value: "Reporting_Module" },
    ]

    const createHandler = async () => {
        if (fdata && !fdata.role) { errorAlert("Please Enter Role"); return null; }
        setLoder(true)
        const datas = {
            "plans": fdata.role,
            "User_Profile_Module": fdata.User_Profile_Module,
            "Course": fdata.Training_Module,
            "Vendor": fdata.Inventory_Module,
            "Exam": fdata.Availability_Module,
            "Qualification_Module": fdata.Qualification_Module,
            // "Reporting_Module": fdata.Reporting_Module
        }
        const resp = await create_rolls(datas);
        if (resp && resp.success) {
            setLoder(false);
            successAlert(resp.message);
            navigate("/roleadminstrator");
        }
        setLoder(false);
    }

    const checkedHandler = (data) => {
        const name = data.data.value;
        const isChecked = data.isChecked;
        setFdata((pre) => ({ ...pre, [name]: isChecked }));
    }
    return (
        <>
            <div className='bgWhite my-3'>
                <Container>
                    <Row className='my-3'>
                        <Col md={4}>
                            <InputField FormLabel='Role Name' FormPlaceHolder='Enter Role Name' value={fdata.roll} onChange={(e) => setFdata((pre) => ({ ...pre, 'role': e.target.value }))} />
                        </Col>
                        <Col md={4}>
                            <Select FormLabel={'Select Platform'}/>
                            {/* <InputField FormLabel='Role Name' FormPlaceHolder='Enter Role Name' value={fdata.roll} onChange={(e) => setFdata((pre) => ({ ...pre, 'role': e.target.value }))} /> */}
                        </Col>
                    </Row>
                    <h6>Select</h6>
                    <div className='RoleModule'>
                        <Row>
                            {moduleList && moduleList.map((e, i) => (
                                <Col md={3} key={i} >
                                    <CheckBoxButton BtnLabel={e.name} fulldata={e} BtnClass={'checked-btn'} onClick={checkedHandler} type={'check'} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                    <Row className='mt-3'>
                        <Col md={4}>
                            <SharedButton BtnLabel={'Create'} type={'button'} onClick={createHandler} BtnVariant={'primary'} BtnClass={'w-100'} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
