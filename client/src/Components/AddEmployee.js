import React, { useEffect, useState } from 'react';
import { notify } from '../utils';
import { CreateEmployee, UpdateEmployeeById } from '../api';

function AddEmployee({
    showModal, setShowModal, fetchEmployees, employeeObj
}) {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        designation: '',
        course: [],  // Ensure this is always an array
        gender: '',
        profileImage: null,
    });
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        if (employeeObj) {
            setEmployee({
                ...employeeObj,
                course: employeeObj.course || [],  // Fallback to empty array if undefined
            });
            setUpdateMode(true);
        }
    }, [employeeObj]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox" && name === "course") {
            setEmployee((prevEmployee) => {
                const updatedCourses = checked
                    ? [...(prevEmployee.course || []), value]  // Add the selected course
                    : (prevEmployee.course || []).filter((course) => course !== value);  // Remove the unselected course
                return { ...prevEmployee, course: updatedCourses };
            });
        } else {
            setEmployee({ ...employee, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        setEmployee({ ...employee, profileImage: e.target.files[0] });
    };

    const resetEmployeeStates = () => {
        setEmployee({
            name: '',
            email: '',
            phone: '',
            designation: '',
            course: [],  // Reset as empty array
            gender: '',
            profileImage: null,
        });
    };

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        try {
            const { success, message } = updateMode
                ? await UpdateEmployeeById(employee, employee._id)
                : await CreateEmployee(employee);

            console.log('create OR update ', success, message);
            if (success) {
                notify(message, 'success');
            } else {
                notify(message, 'error');
            }
            setShowModal(false);
            resetEmployeeStates();
            fetchEmployees();
            setUpdateMode(false);
        } catch (err) {
            console.error(err);
            notify('Failed to create Employee', 'error');
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setUpdateMode(false);
        resetEmployeeStates();
    };

    return (
        <div className={`modal ${showModal ? 'd-block' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {updateMode ? 'Update Employee' : 'Add Employee'}
                        </h5>
                        <button type="button" className="btn-close" onClick={handleModalClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleAddEmployee}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={employee.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={employee.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={employee.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Designation</label>
                                <select
                                    className="form-control"
                                    name="designation"
                                    value={employee.designation}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Designation</option>
                                    <option value="HR">HR</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Sales">Sales</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Gender</label>
                                <div>
                                    <input
                                        type="radio"
                                        id="male"
                                        name="gender"
                                        value="Male"
                                        checked={employee.gender === 'Male'}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="male">Male</label>

                                    <input
                                        type="radio"
                                        id="female"
                                        name="gender"
                                        value="Female"
                                        checked={employee.gender === 'Female'}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="female">Female</label>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Course</label>
                                <div>
                                    <input
                                        type="checkbox"
                                        id="mca"
                                        name="course"
                                        value="MCA"
                                        checked={employee.course && employee.course.includes('MCA')}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="mca">MCA</label>

                                    <input
                                        type="checkbox"
                                        id="bca"
                                        name="course"
                                        value="BCA"
                                        checked={employee.course && employee.course.includes('BCA')}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="bca">BCA</label>

                                    <input
                                        type="checkbox"
                                        id="bsc"
                                        name="course"
                                        value="BSC"
                                        checked={employee.course && employee.course.includes('BSC')}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="bsc">BSC</label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Profile Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="profileImage"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                {updateMode ? 'Update' : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEmployee;



// import React, { useEffect, useState } from 'react'
// import { notify } from '../utils';
// import { CreateEmployee, UpdateEmployeeById } from '../api';

// function AddEmployee({
//     showModal, setShowModal, fetchEmployees, employeeObj
// }) {
//     const [employee, setEmployee] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         designation: '',
//         course: [],
//         gender:'',
//         profileImage: null,
//     });
//     const [updateMode, setUpdateMode] = useState(false);

//     useEffect(() => {
//         if (employeeObj) {
//             setEmployee(employeeObj);
//             setUpdateMode(true);
//         }
//     }, [employeeObj]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEmployee({ ...employee, [name]: value });
//     };

//     const handleFileChange = (e) => {
//         setEmployee({ ...employee, profileImage: e.target.files[0] });
//     };

//     const resetEmployeeStates = () => {
//         setEmployee({
//             name: '',
//             email: '',
//             phone: '',
//             designation: '',
//             course: [],
//             gender:'',
//             profileImage: null,
//         })
//     }

//     const handleAddEmployee = async (e) => {
//         e.preventDefault();
//         try {
//             const { success, message } = updateMode ?
//                 await UpdateEmployeeById(employee, employee._id)
//                 : await CreateEmployee(employee);
//             console.log('create OR update ', success, message);
//             if (success) {
//                 notify(message, 'success')
//             } else {
//                 notify(message, 'error')
//             }
//             setShowModal(false);
//             resetEmployeeStates();
//             fetchEmployees();
//             setUpdateMode(false);
//         } catch (err) {
//             console.error(err);
//             notify('Failed to create Employee', 'error')
//         }
//     }

//     const handleModalClose = () => {
//         setShowModal(false);
//         setUpdateMode(false);
//         resetEmployeeStates();
//     }
//     return (
//         < div className={`modal ${showModal ? 'd-block' : ''}`
//         } tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
//             <div className="modal-dialog" role="document">
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <h5 className="modal-title"> {
//                             updateMode ? 'Update Employee' : 'Add Employee'
//                         }</h5>
//                         <button type="button" className="btn-close"
//                             onClick={() => handleModalClose()}>
//                         </button>
//                     </div>
//                     <div className="modal-body">
//                         <form onSubmit={handleAddEmployee}>
//                             <div className="mb-3">
//                                 <label className="form-label">Name</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     name="name"
//                                     value={employee.name}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label className="form-label">Email</label>
//                                 <input
//                                     type="email"
//                                     className="form-control"
//                                     name="email"
//                                     value={employee.email}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label className="form-label">Phone</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     name="phone"
//                                     value={employee.phone}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-3">
//                             <label className="form-label">Designation</label>
//                             <select
//                                 className="form-control"
//                                 name="designation"
//                                 value={employee.designation}
//                                 onChange={handleChange}
//                                 required
//                             >
//                                 <option value="">Select Designation</option>
//                                 <option value="HR">HR</option>
//                                 <option value="Manager">Manager</option>
//                                 <option value="Sales">Sales</option>
//                             </select>
//                             </div>
//                             <div className="mb-3">
//                             <label className="form-label">Gender</label>
//                             <div>
//                                 <input
//                                     type="radio"
//                                     id="male"
//                                     name="gender"
//                                     value="Male"
//                                     checked={employee.gender === 'Male'}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 <label htmlFor="male">Male</label>

//                                 <input
//                                     type="radio"
//                                     id="female"
//                                     name="gender"
//                                     value="Female"
//                                     checked={employee.gender === 'Female'}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 <label htmlFor="female">Female</label>
//                             </div>
//                             </div>
                    
//                             <div className="mb-3">
//                             <label className="form-label">Course</label>
//                             <div>
//                             <input
//                                 type="checkbox"
//                                 id="mca"
//                                 name="course"
//                                 value="MCA"
//                                 checked={employee.course.includes('MCA')}
//                                     onChange={handleChange}
//                                 />
//                                 <label htmlFor="mca">MCA</label>
                        
//                                 <input
//                                 type="checkbox"
//                                 id="bca"
//                                 name="course"
//                                 value="BCA"
//                                 checked={employee.course.includes('BCA')}
//                                 onChange={handleChange}
//                                 />
//                             <label htmlFor="bca">BCA</label>
                                        
//                             <input
//                                 type="checkbox"
//                                 id="bsc"
//                                 name="course"
//                                 value="BSC"
//                                 checked={employee.course.includes('BSC')}
//                                 onChange={handleChange}
//                             />
//                             <label htmlFor="bsc">BSC</label>
//                         </div>
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">Profile Image</label>
//                         <input
//                             type="file"
//                             className="form-control"
//                             name="profileImage"
//                             onChange={handleFileChange}
//                         />
//                     </div>
//                     <button type="submit"
//                         className="btn btn-primary">
//                                 {updateMode ? 'Update' : 'Submit'}
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div >

//     )
// }

// export default AddEmployee