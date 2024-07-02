import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { PoSidebar } from '../../PO_Sidebar'
import { SharedButton } from '../../../components/Button'
import { EditGearForm } from './EditGearForm'
import { EditAdminstratorForm } from './EditAdminstratorForm'
import { useLocation } from 'react-router-dom'
import { Loader } from '../../../components/Loader'
import { getUserGear_API, getUserQualification_API } from '../../../api_services/Apiservices'
import { ReactComponent as AddIconSvg } from '../../../images/ArrowLeft.svg';

export const EditProfileAdminstrator = () => {
    const location = useLocation();
    const [pre, setPre] = useState();
    const [loder, setLoder] = useState(false);
    const [key, setKey] = useState('home');

    const [grdata, setGrdata] = useState([]);
    const [quadata, setQuadata] = useState([]);

    const getgr = async (id) => {
        const resp = await getUserGear_API({ "id": id });
        if (resp && resp.success) {
            setLoder(false);
            setGrdata(resp.data);
        }
        setLoder(false);
    }

    const getqua = async (id) => {
        const resp = await getUserQualification_API({ "id": id });
        if (resp && resp.success) {
            setLoder(false);
            setQuadata(resp.data);
        }
        setLoder(false);
    }


    useEffect(() => {
        if (location && location.state) {
            setPre(location.state.data);
            const id = location.state.data._id;
            if (id) { getgr(id); getqua(id); }
        }
    }, [location, key])



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
                            <Headings MainHeading={"User Profile"}/>
                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3"
                                >
                                    <Tab eventKey="home" title="User Info ">
                                        <div className='text-right'>
                                            <SharedButton BtnLabel={"Back"} onClick={() => window.history.back()} BtnVariant={'light'}  startIcon={<AddIconSvg/>}/>
                                        </div>
                                        <EditAdminstratorForm pre={pre} setLoder={setLoder} grdata={grdata} quadata={quadata} />
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
