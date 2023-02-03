import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,

  MDBCol,

  MDBBtn,

} from "mdb-react-ui-kit";

const Showdetails = () => {
  const{userId}=useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    loadusersData();
  }, []);


  const loadusersData = async () => {
        return await axios
          .get(
            `https://jsonplaceholder.typicode.com/users?id=${userId}`
          )
          .then((response) => {
            setData(response.data);
          })
          .catch((err) => console.log(err));
    }
  return (
    <div>
          <MDBCol size="12">
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">UserName</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  <th scope="col">Company</th>
                </tr>
              </MDBTableHead>
      {
                data.map((item, index) => (
                  
                  <MDBTableBody key={index}>
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                       <td>
                        {item.address.street},{item.address.suite},
                        {item.address.city},{item.address.zipcode}
                       </td>
                      <td>{item.company.name}</td>
                    </tr>
                  </MDBTableBody>
               
                ))}
              
              </MDBTable>
          </MDBCol>
          <Link to="/"><MDBBtn style={{marginLeft:"590px"}} className="me-1" color="danger">
                  Hide Details
                </MDBBtn></Link>
    </div>
  )
}

export default Showdetails