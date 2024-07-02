import { useState } from 'react';
import { PoSidebar } from '../PO_Sidebar'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { CourseForm } from './CourseForm';
import { SharedButton } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { ReactComponent as AddIconSvg } from '../../images/ArrowLeft.svg';

export const CreateCourse = () => {
    const navigate = useNavigate();
    const [loder, setLoder] = useState(false);
    const handleCreateAccount = () => {
        navigate('/traininglist');
    }
    return (
        <>
            <Loader show={loder} />
            <div className='Training'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Course"} />
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={"home"}
                                className="my-4"
                            >
                                <Tab eventKey="home" title="Course Info">
                                    <div className='text-right'>
                                        <SharedButton onClick={() => window.history.back()} BtnLabel={"Back"} BtnVariant={'light'} style={{ background: '#00285D' }} startIcon={<AddIconSvg />} />
                                    </div>
                                    <div className='bgWhite mt-3'>
                                        <CourseForm setLoder={setLoder} />
                                    </div>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
