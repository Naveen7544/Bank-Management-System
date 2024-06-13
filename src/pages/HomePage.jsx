import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { Tag } from "primereact/tag";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { useNavigate } from "react-router-dom";
import axis from "../assets/bank/axis.png";
import bob from "../assets/bank/bob.png";
import hdfc from "../assets/bank/hdfc.png";
import icici from "../assets/bank/icici.png";
import pnb from "../assets/bank/pnb.png";
import sbi from "../assets/bank/sbi.png";
import kotak from "../assets/bank/kotak.png";
import canera from "../assets/bank/canera.png";
import union from "../assets/bank/union.png";
import { Panel } from "primereact/panel";

const HomePage = () => {
  const navigate = useNavigate();
  const [banks, setBanks] = useState([]);

  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const bankData = [
    {
      id: 1,
      name: "State Bank of India",
      inventoryStatus: "INSTOCK",
      image: sbi,
    },
    { id: 2, name: "HDFC Bank", inventoryStatus: "INSTOCK", image: hdfc },
    { id: 3, name: "ICICI Bank", inventoryStatus: "LOWSTOCK", image: icici },
    { id: 4, name: "Axis Bank", inventoryStatus: "INSTOCK", image: axis },
    {
      id: 5,
      name: "Kotak Mahindra Bank",
      inventoryStatus: "INSTOCK",
      image: kotak,
    },
    {
      id: 6,
      name: "Punjab National Bank",
      inventoryStatus: "OUTOFSTOCK",
      image: pnb,
    },
    { id: 7, name: "Bank of Baroda", inventoryStatus: "LOWSTOCK", image: bob },
    { id: 8, name: "Canara Bank", inventoryStatus: "INSTOCK", image: canera },
    {
      id: 9,
      name: "Union Bank of India",
      inventoryStatus: "LOWSTOCK",
      image: union,
    },
  ];


  useEffect(() => {
    setBanks(bankData);
  }, []);

  const handleCreate = () => {
    navigate("/create-beneficiary");
  };

  const headerTitle ="ADD BENEFICIARY ACCOUNT";
  const bankTemplate = (bank) => {

    return (
      <Panel
        header={headerTitle}
        style={{ marginTop: "20px", padding: "30px" }}
      >
      <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
        <div
          className="mb-3"
          style={{
            width: "200px",
            height: "50px",
            objectFit: "cover",
            marginLeft: "100px",
          }}
        >
          <img src={bank.image} alt={bank.name} className="w-6 shadow-2" />
        </div>
        <div style={{ paddingTop: "40px" }}>
          <h4 className="mb-1">{bank.name}</h4>
          <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
            <Button icon="pi pi-plus" className="p-button p-button-rounded" onClick={handleCreate} label="Add"/>      
          </div>
        </div>
      </div>
      </Panel>
    );
  };

  return (
    <div className="card">
   <h2>Customer Banking</h2>
      <Carousel
        value={banks}
        numVisible={3}
        numScroll={3}
        responsiveOptions={responsiveOptions}
        className="custom-carousel"
        circular
        autoplayInterval={3000}
        itemTemplate={bankTemplate}
      />
    </div>
  );
};

export default HomePage;
