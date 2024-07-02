import React, { useState } from 'react'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { PoSidebar } from '../../PO_Sidebar'
import { SharedButton } from '../../../components/Button'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../../components/Loader'
import { ReactComponent as AddIconSvg } from '../../../images/ArrowLeft.svg';
import { VendorForm } from './VendorForm'

export const VendorProfile = () => {
    const [loder, setLoder] = useState(false);
    const navigate = useNavigate();
    const handleCreateAccount = () => {
        navigate('/vendorprofilelist');
    }
    return (
        <>
            <Loader show={loder} />
            <div className='RoleAdminstrator'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Vendor Profile"} />
                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={"home"}
                                    className="mb-3"
                                >
                                    <Tab eventKey="home" title="Account Profile">
                                        <div className='text-right'>
                                            <SharedButton onClick={handleCreateAccount} BtnLabel={"Back"} BtnVariant={'light'} style={{ background: '#00285D' }} startIcon={<AddIconSvg/>}/>
                                        </div>
                                        <div className='bgWhite mt-3'>
                                            <VendorForm setLoder={setLoder} />
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
