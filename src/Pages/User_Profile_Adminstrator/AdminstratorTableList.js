import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { TablePagination } from '../../components/TablePagination';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as EyeIconSvg } from '../../../src/images/Eye.svg';
import { update_actice_inactive_API } from '../../api_services/Apiservices';
import { SearchPanel } from '../../components/SearchPanel';
import { IoSearch } from 'react-icons/io5';
import moment from 'moment';


export const AdminstratorTableList = ({ pagination, maindata = [], actionHandler,pageHanlder }) => {
  const navigate = useNavigate();


  const handleEditClick = (mydata) => { navigate('/editprofileadminstrator', { state: { data: mydata } }); };

  return (
    <>
      <div className='MainTable '>
        <Table responsive className='table table-hover'>
          <thead>
            <tr>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>EMAIL</th>
              <th>MOBILE NO</th>
              <th>ROLE NAME</th>
              <th style={{ textAlign: "center" }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {maindata.map((account, index) => (
              <tr key={index}>
                <td>{account.first_name}</td>
                <td>{account.last_name}</td>
                <td>{account.email}</td>
                <td>{account.mobile_no}</td>
                <td>{account.role}</td>
                <td>
                  <Button variant="light" size="sm" className="me-2"
                    onClick={() => handleEditClick(account.full_data)}
                  >
                    <EyeIconSvg/>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <TablePagination pagination={pagination} pageHanlder={pageHanlder}/>
      </div>
    </>
  )
}
