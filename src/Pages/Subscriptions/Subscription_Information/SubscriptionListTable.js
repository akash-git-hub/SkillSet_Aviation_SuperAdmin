import React from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { TablePagination } from '../../../components/TablePagination';



export const SubscriptionListTable = ({ trdata }) => {
    const navigate = useNavigate();
    const handleEditClick = (data) => {
        navigate("/qualificationdetail", { state: { data } });

    }


    return (
        <>
            <div className='TrainingViewList'>
                <Container>
                    <div className='MainTable'>
                        <Table responsive className="table table-hover">
                            <thead>
                                <tr>
                                    <th>PLAN  NAME</th>
                                    <th>COURSE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trdata.map((account, index) => (
                                    <tr key={index}>
                                        <td>{account.name}</td>
                                        <td>{account.type}</td>
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
