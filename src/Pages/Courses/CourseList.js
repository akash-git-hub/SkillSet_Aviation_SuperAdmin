import { useEffect, useState } from 'react';
import { PoSidebar } from '../PO_Sidebar'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { ListView } from './ListView';
import { SharedButton } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { getTraningAll_API } from '../../api_services/Apiservices';
import { Loader } from '../../components/Loader';
import { ReactComponent as AddIconSvg } from '../../images/Add.svg';

export const CourseList = () => {
    const [key, setKey] = useState('home');
    const [trdata, setTrdata] = useState([]);
    const [loder, setLoder] = useState(false);

    const navigate = useNavigate();

    const getdata = async () => {
        setLoder(true);
        const resp = await getTraningAll_API();
        if (resp && resp.success) {
            setLoder(false);
            setTrdata(resp.data);
        }
        setLoder(false);
    }
    useEffect(() => {
        getdata();
    }, [])

    const handleNavigation = () => {
        navigate('/course');
    };

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
                            <Headings MainHeading={"Course"} />
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="my-4"
                            >
                                <Tab eventKey="home" title="Course Listing">
                                <div className='text-right'>
                                    <SharedButton BtnLabel={"Create Course"} BtnVariant={'light'} onClick={handleNavigation} startIcon={<AddIconSvg/>}/>
                                </div>
                                    <ListView trdata={trdata} />
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
