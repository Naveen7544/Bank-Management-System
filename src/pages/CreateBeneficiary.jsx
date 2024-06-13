import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation} from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const accountTypes = [
  { label: "Savings", value: "Savings" },
  { label: "Current", value: "Current" },
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  accountNumber: Yup.string()
    .matches(/^\d+$/, "Account number must be numeric")
    .required("Account number is required"),
  bankName: Yup.string().required("Bank name is required"),
  accountType: Yup.string().required("Type of account is required"),
});

const CreateBeneficiary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [beneficiary, setBeneficiary] = useState(null);
  const [error, setError] = useState(null);
  const beneficiaryDetails  = location.state?.rowData;
  console.log("customerDetails", beneficiaryDetails);

  const initialValues = {
    name: beneficiaryDetails?.name||"",
    accountNumber: beneficiaryDetails?.accountNumber||"",
    bankName: beneficiaryDetails?.bankName||"",
    accountType: beneficiaryDetails?.accountType||"",
  };

  const headerTitle = beneficiaryDetails?.id?"Edit Beneficiary":"Create Beneficiary";

  const handleSubmit = (values) => {
    console.log("Form values:", values);
  
    const createUrl = "https://708e3169-02b6-4fe3-9218-ff5fc425500b.mock.pstmn.io/createbeneficiary";
    const updateUrl = "https://708e3169-02b6-4fe3-9218-ff5fc425500b.mock.pstmn.io/updatebeneficiary";
  
    const data = {
      id: beneficiaryDetails?.id || "",
      name: values?.name || beneficiaryDetails?.name,
      accountNumber: values?.accountNumber || beneficiaryDetails?.accountNumber,
      bankName: values?.bankName || beneficiaryDetails?.bankName,
      accountType: values?.accountType || beneficiaryDetails?.accountType,
    };
  
    const apiUrl = beneficiaryDetails?.id ? updateUrl : createUrl;
  
    axios.post(apiUrl, data)
      .then((response) => {
        setBeneficiary(response.data);
        toast.success(beneficiaryDetails?.id ? "Beneficiary updated successfully!" : "Beneficiary created successfully!");
        
        setTimeout(() => {
          navigate("/beneficiary");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
        toast.error("Error creating beneficiary. Please try again.");
      });
  };

  return (
    <div className="p-mt-4 p-px-4">
      <Panel
        header={headerTitle}
        style={{ marginTop: "20px", padding: "30px" }}
      >
        <Card>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className="form-container">
                  <div className="field-wrapper">
                    <label htmlFor="name">Name</label>
                    <Field
                      name="name"
                      as={InputText}
                      id="name"
                      className="p-inputtext input-field"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="p-error"
                    />
                  </div>

                  <div className="field-wrapper">
                    <label htmlFor="accountNumber">Account Number</label>
                    <Field
                      name="accountNumber"
                      as={InputText}
                      id="accountNumber"
                      className="p-inputtext input-field"
                    />
                    <ErrorMessage
                      name="accountNumber"
                      component="div"
                      className="p-error"
                    />
                  </div>

                  <div className="field-wrapper">
                    <label htmlFor="bankName">Bank Name</label>
                    <Field
                      name="bankName"
                      as={InputText}
                      id="bankName"
                      className="p-inputtext input-field"
                    />
                    <ErrorMessage
                      name="bankName"
                      component="div"
                      className="p-error"
                    />
                  </div>

                  <div className="field-wrapper">
                    <label htmlFor="accountType">Type of Account</label>
                    <Field
                      name="accountType"
                      render={({ field }) => (
                        <Dropdown
                          id="accountType"
                          {...field}
                          options={accountTypes}
                          onChange={(e) =>
                            setFieldValue("accountType", e.value)
                          }
                          placeholder="Select an account type"
                          className="input-field"
                        />
                      )}
                    />
                    <ErrorMessage
                      name="accountType"
                      component="div"
                      className="p-error"
                    />
                  </div>
                  <div className="submitbtn">
                    <Button
                      type="submit"
                      label="Submit"
                      className="p-mt-2 primary-button"
                    />
                    <Button
                      type="button"
                      label="Cancel"
                      className="p-mt-2 secondary-button"
                      onClick={() => navigate("/beneficiary")}
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </Panel>
    </div>
  );
};

export default CreateBeneficiary;
