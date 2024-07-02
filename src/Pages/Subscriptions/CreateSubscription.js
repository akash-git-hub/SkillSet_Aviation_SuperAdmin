import React, { useState } from 'react'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { PoSidebar } from '../PO_Sidebar'
import { Headings } from '../../components/Headings'
import { SusbscriptionForm } from './Subscription_Information/SusbscriptionForm';
import { SharedButton } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { ReactComponent as AddIconSvg } from '../../../src/images/ArrowLeft.svg';


export const CreateSubscription = () => {
    const navigate = useNavigate();
    const [loder, setLoder] = useState(false);
    const [key, setKey] = useState('gear');
    const handleCreateAccount = () => {
        navigate('/subcriptionlist');
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
                            <Headings MainHeading={"Subscriptions"} />
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3">
                                <Tab eventKey="gear" title="Plan Listing">
                                    <div className='text-right'>
                                        <SharedButton onClick={handleCreateAccount} BtnLabel={"Back"} BtnVariant={'light'} style={{ background: '#00285D' }} startIcon={<AddIconSvg/>}/>
                                    </div>
                                    <SusbscriptionForm setLoder={setLoder} />
                                </Tab>
                            </Tabs>

                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
