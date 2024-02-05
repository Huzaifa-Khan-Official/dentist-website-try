import React, { useState } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';

export default function Modal({ children }) {
    const [basicModal, setBasicModal] = useState(false);
    const workOptions = ["work 1", "work 2", "work 3", "work 4", "work 5"];

    const toggleOpen = () => setBasicModal(!basicModal);

    const handleSaveChanges = () => {
        // Your save changes logic goes here

        // Close the modal after saving changes
        toggleOpen();
    };

    return (
        <>
            <MDBBtn onClick={toggleOpen} rounded className='addPatientBtn'>Add Patient</MDBBtn>

            <MDBModal open={basicModal} setOpen={setBasicModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Add Patient Details</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            {children}
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleOpen}>
                                Close
                            </MDBBtn>
                            <MDBBtn onClick={handleSaveChanges}>Add Patient</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}
