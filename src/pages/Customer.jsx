import React, { useState, useEffect } from 'react';
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import PrimeTable from "../components/PrimeTable";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCustomer, removeCustomer } from "../slices/customerSlice";

const Customer = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customerData = useSelector((state) => state?.customerList?.customer);

  const columns = [
    { field: "fullName", header: "FullName", sortable: true },
    { field: "address", header: "Address", sortable: true },
    { field: "country", header: "Country", sortable: true },
    { field: "pincode", header: "Pincode", sortable: true },
  ];

  useEffect(() => {
    getCustomer()
  }, []); 

  const getCustomer = () => {
  let apiUrl = 'https://708e3169-02b6-4fe3-9218-ff5fc425500b.mock.pstmn.io/customer';
  axios.get(apiUrl)
    .then(response => {
      dispatch(setCustomer(response.data));
    })
    .catch(error => {
      setError(error);
    });
  }
  const handleNewItemClick = () => {
    navigate("/create-customer");
  };

  const handleEdit = (rowData) => {
    navigate(`/edit-customer/${rowData.id}`,{ state: { rowData } });
  };

  const handleDelete = async (rowData) => {
    try {
      const response = await axios.delete(`https://708e3169-02b6-4fe3-9218-ff5fc425500b.mock.pstmn.io/deletecustomer/${rowData.id}`);
      toast.success(response?.data.message);
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div className="p-mt-4 p-px-4">
      <Panel header="Customer" style={{ marginTop: "20px" }}>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            label="Add Customer"
            icon="pi pi-plus"
            severity="success"
            onClick={handleNewItemClick}
          />
        </div>

        <Card>
          <PrimeTable
            columns={columns}
            usersData={customerData}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={false}
          />
        </Card>
        <ToastContainer />
      </Panel>
    </div>
  );
};

export default Customer;
