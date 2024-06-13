import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const countryOptions = [
  { label: "India", value: "India" },
  { label: "USA", value: "USA" },
  { label: "Canada", value: "Canada" },
  { label: "UK", value: "UK" },
  { label: "Australia", value: "Australia" },
];

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  address: Yup.string().required("Address is required"),
  country: Yup.string().required("Country is required"),
  pincode: Yup.string().required("Pincode is required"),
});

const CreateCustomer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);
  const customerDetails = location.state?.rowData;

  const initialValues = {
    fullName: customerDetails?.fullName || "",
    address: customerDetails?.address || "",
    country: customerDetails?.country || "",
    pincode: customerDetails?.pincode || "",
  };

  const headerTitle = customerDetails?.id ? "Edit Customer" : "Create Customer";

  const handleSubmit = (values) => {
    console.log("Form values:", values);

    const createUrl =
      "https://708e3169-02b6-4fe3-9218-ff5fc425500b.mock.pstmn.io/createcustomer";
    const updateUrl =
      "https://708e3169-02b6-4fe3-9218-ff5fc425500b.mock.pstmn.io/updatecustomer";

    const data = {
      id: customerDetails?.id || "",
      fullName: values?.fullName || customerDetails?.fullName,
      address: values?.address || customerDetails?.address,
      country: values?.country || customerDetails?.country,
      pincode: values?.pincode || customerDetails?.pincode,
    };

    const apiUrl = customerDetails?.id ? updateUrl : createUrl;

    axios
      .post(apiUrl, data)
      .then((response) => {
        console.log("Response:", response);
        setCustomer(response.data);
        toast.success(
          customerDetails?.id
            ? "Customer updated successfully!"
            : "Customer created successfully!"
        );

        setTimeout(() => {
          navigate("/customer");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
        toast.error("Error creating customer. Please try again.");
      });
  };

  return (
    <div className="p-mt-4 p-px-4">
      <Panel header={headerTitle} style={{ marginTop: "20px" }}>
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
                    <label htmlFor="fullName">Full Name</label>
                    <Field
                      name="fullName"
                      as={InputText}
                      id="fullName"
                      className="p-inputtext input-field"
                    />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="p-error"
                    />
                  </div>

                  <div className="field-wrapper">
                    <label htmlFor="address">Address</label>
                    <Field
                      name="address"
                      as={InputText}
                      id="address"
                      className="p-inputtext input-field"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="p-error"
                    />
                  </div>

                  <div className="field-wrapper">
                    <label htmlFor="country">Country</label>
                    <Field
                      name="country"
                      render={({ field }) => (
                        <Dropdown
                          id="country"
                          {...field}
                          options={countryOptions}
                          onChange={(e) => setFieldValue("country", e.value)}
                          placeholder="Select a country"
                          className="input-field"
                        />
                      )}
                    />
                    <ErrorMessage
                      name="country"
                      component="div"
                      className="p-error"
                    />
                  </div>

                  <div className="field-wrapper">
                    <label htmlFor="pincode">Pincode</label>
                    <Field
                      name="pincode"
                      as={InputText}
                      id="pincode"
                      className="p-inputtext input-field"
                    />
                    <ErrorMessage
                      name="pincode"
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
                      onClick={() => navigate("/customer")}
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
        <ToastContainer />
      </Panel>
    </div>
  );
};

export default CreateCustomer;
