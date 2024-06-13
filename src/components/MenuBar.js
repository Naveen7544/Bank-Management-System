import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import logo from "../assets/banklogo.PNG"

export default function MenuBar() {
    const navigate = useNavigate();

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => navigate('/')
        },
        {
            label: 'Customer',
            icon: 'pi pi-star',
            command: () => navigate('/customer')
        },
        {
            label: 'Bneficiary',
            icon: 'pi pi-star',
            command: () => navigate('/beneficiary')
        }
      
    ];

    const start = <img alt="logo" src={logo} height="50" className="mr-2" />;
    const end = (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
        </div>
    );

    return (
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
    );
}
