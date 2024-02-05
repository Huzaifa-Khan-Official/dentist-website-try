import React, { useState } from 'react'

function AddPatientForm() {
    let [patientName, setpatientName] = useState("");
    const workOptions = ["work 1", "work 2", "work 3", "work 4", "work 5"];
    return (
        <>
            <div className="mb-3">
                <label className="form-label">
                    Patient Name:
                </label>
                <input
                    type="text"
                    className="form-control"
                    placeholder='Enter patient name'
                    value={patientName}
                    onChange={(e) => setpatientName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Contact Number:
                </label>
                <input
                    type="number"
                    className="form-control"
                    placeholder='Enter patient contact'
                />
            </div>
            <div className="mb-3">
                <label className='form-label'>Works:</label>
                <input type="text" className='form-control' placeholder='Enter works with spaces'/>
            </div>
            <div className="mb-3">
                <label className='form-label'>Total Amount:</label>
                <input
                    type="number"
                    className='form-control'
                    placeholder='Enter total amount'
                />
            </div>
        </>

    )
}

export default AddPatientForm