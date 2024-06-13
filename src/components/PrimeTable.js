import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

const PrimeTable = ({ columns, usersData, onEdit, onDelete, onView = true, buttonLabels = {} }) => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [deleteUser, setDeleteUser] = useState(null);
    const toast = useRef(null);
    const [globalFilter, setGlobalFilter] = useState("");

    const confirmDeleteUser = () => {
        onDelete(deleteUser);
        setDeleteUser(null);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {onView && <Button icon="pi pi-eye" className="p-button-rounded p-button-info mr-2" onClick={() => onView(rowData)}/>}
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => onEdit(rowData)}/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => setDeleteUser(rowData)}/>
            </React.Fragment>
        );
    };

    const deleteUserDialogFooter = (
        <React.Fragment>
            <Button label={buttonLabels.no || "No"} icon="pi pi-times" className="p-button-text" onClick={() => setDeleteUser(null)} />
            <Button label={buttonLabels.yes || "Yes"} icon="pi pi-check" className="p-button-text" onClick={confirmDeleteUser} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <DataTable
                    value={usersData}
                    selection={selectedUsers}
                    onSelectionChange={(e) => setSelectedUsers(e.value)}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                    globalFilter={globalFilter}
                    header={
                        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                            <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
                        </div>
                    }
                >
                    {columns.map((col, index) => (
                        <Column key={index} field={col.field} header={col.header} sortable={col.sortable} />
                    ))}
                    <Column body={actionBodyTemplate} header="Actions" />
                </DataTable>
            </div>

            <Dialog visible={deleteUser !== null} style={{ width: '32rem' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={() => setDeleteUser(null)}>
                {deleteUser && (
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem', color:"red"}} />
                        <span>Are you sure you want to delete this data?</span>
                    </div>
                )}
            </Dialog>
        </div>
    );
};

export default PrimeTable;
