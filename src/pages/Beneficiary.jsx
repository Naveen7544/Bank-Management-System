import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import PrimeTable from "../components/PrimeTable";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setBeneficiary, removeBeneficiary } from "../slices/beneficiarySlice";

const BeneficiaryList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const beneficiaryList = useSelector(
    (state) => state?.beneficiaryList?.beneficiary
  );

  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [currentBeneficiary, setCurrentBeneficiary] = useState(null);

  console.log("currentBeneficiary", currentBeneficiary);

  const columns = [
    { field: "name", header: "Name", sortable: true },
    { field: "accountNumber", header: "Account Number", sortable: true },
    { field: "bankName", header: "Bank Name", sortable: true },
    { field: "accountType", header: "Account Type", sortable: true },
  ];

  useEffect(() => {
    getBeneficiary();
  }, []);

  const getBeneficiary = () => {
    let apiUrl =
      "https://708e3169-02b6-4fe3-9218-ff5fc425500b.mock.pstmn.io/beneficiary";
    axios
      .get(apiUrl)
      .then((response) => {
        dispatch(setBeneficiary(response.data));
        // setBeneficiaryList(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  };
  const handleNewItemClick = () => {
    navigate("/create-beneficiary");
  };

  const handleEdit = (rowData) => {
    navigate(`/edit-beneficiary/${rowData.id}`, { state: { rowData } });
  };

  const handleDelete = async (rowData) => {
    try {
      const response = await axios.delete(
        `https://708e3169-02b6-4fe3-9218-ff5fc425500b.mock.pstmn.io/beneficiarydelete/${rowData.id}`
      );
      toast.success(response?.data.message);
    } catch (error) {
      console.error("Error deleting beneficiary:", error);
    }
  };

  const handleView = async (rowData) => {
    setCurrentBeneficiary(rowData);
    setVisible(true);
  };

  return (
    <div className="p-mt-4 p-px-4">
      <Panel header="Beneficiary" style={{ marginTop: "20px" }}>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            label="Add Beneficiary"
            icon="pi pi-plus"
            severity="success"
            onClick={handleNewItemClick}
          />
        </div>

        <Card>
          <PrimeTable
            columns={columns}
            usersData={beneficiaryList}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        </Card>
        <ToastContainer />
        <div className="card flex justify-content-center">
          <Dialog
            header="Beneficiary"
            visible={visible}
            style={{ width: "30vw", borderRadius: "10px" }}
            onHide={() => {
              if (!visible) return;
              setVisible(false);
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                textAlign: "start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  fontWeight: "600",
                }}
              >
                <label style={{ marginBottom: "10px" }}>Name :</label>
                <label style={{ marginBottom: "10px" }}>Account Number :</label>
                <label style={{ marginBottom: "10px" }}>Bank Name :</label>
                <label>Account Type :</label>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "20px",
                }}
              >
                <label style={{ marginBottom: "10px" }}>{currentBeneficiary?.name}</label>
                <label style={{ marginBottom: "10px" }}>
                  {currentBeneficiary?.accountNumber}
                </label>
                <label style={{ marginBottom: "10px" }}>
                  {currentBeneficiary?.bankName}
                </label>
                <label>{currentBeneficiary?.accountType}</label>
              </div>
            </div>
          </Dialog>
        </div>
      </Panel>
    </div>
  );
};

export default BeneficiaryList;
