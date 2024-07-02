import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { PoSidebar } from '../PO_Sidebar'
import { Headings } from '../../components/Headings'
import { SharedButton } from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../components/Loader'
import { getQualification_API } from '../../api_services/Apiservices'
import { ReactComponent as AddIconSvg } from '../../../src/images/Add.svg';
import { SubscriptionListTable } from './Subscription_Information/SubscriptionListTable'

export const SubscriptionList = () => {
    const navigate = useNavigate();
    const [predata, setPredata] = useState([]);
    const [trdata, setTrdata] = useState([]);
    const [loder, setLoder] = useState(false);

    const getdata = async () => {
        setLoder(true);
        const resp = await getQualification_API();
        if (resp && resp.success) {
            setLoder(false);
            const fdata = resp.data;
            setPredata(fdata);
            setTrdata(resp.data);
        }
        setLoder(false);
    }
    useEffect(() => { getdata(); }, [])





    const [key, setKey] = useState('gear');
    const handleCreateAccount = () => {
        navigate('/subcription');
    }
    return (
        <>
            <Loader show={loder} />
            <div className='InventoryList'>
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
                                className="mb-3"
                            >
                                <Tab eventKey="gear" title="Plan Listing">
                                    <div className='text-right'>
                                        <SharedButton onClick={handleCreateAccount} BtnLabel={"Create Plan"} BtnVariant={'light'} style={{ background: '#00285D' }} startIcon={<AddIconSvg />} />
                                    </div>
                                    <SubscriptionListTable trdata={trdata} />
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
