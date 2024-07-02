import React from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { TablePagination } from '../../components/TablePagination';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as AddIconSvg } from '../../images/Eye.svg';




export const ListView = ({ trdata }) => {
    const navigate = useNavigate();
    const handleEditClick = (data) => {
        navigate("/course", { state: { data } });

    }


    return (
        <>
            <div className='TrainingViewList'>
                <Container>
                    <div className='MainTable'>
                        <Table responsive className="table table-hover">
                            <thead>
                                <tr>
                                    <th>IMAGES</th>
                                    <th>COURSE NAME</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trdata.map((account, index) => (
                                    <tr key={index}>
                                        <td>
                                            <img src='' alt='Image'/>
                                        </td>
                                        <td style={{ maxWidth: "300px" }}>{account.description}</td>
                                        <td>     <Button variant="light" size="sm" className="me-2"
                                            onClick={() => handleEditClick(account)}
                                        >
                                            
                                           <AddIconSvg/> View
                                        </Button></td>
                                    </tr>
                                ))}
                            </tbody>
                            <TablePagination />
                        </Table>
                    </div>
                </Container>
            </div>
        </>
    )
}
