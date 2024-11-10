import React, { useState } from 'react';
import ROLE from '../common/role';
import { FaWindowClose } from "react-icons/fa";
import SummaryApi from '../common'; // Adjust the path if needed
import { toast } from 'react-toastify';

const ChangeUserRole = ({ name, email, role, userId, onClose, onUpdate }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    try {
      const response = await fetch(SummaryApi.updateUser.url, {
        method: SummaryApi.updateUser.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: userId, // Ensure you pass the correct user ID
          role: userRole, // The updated role
        }),
      });

      const responseJson = await response.json();
      if (responseJson.success) {
        toast.success("Role updated successfully");

        // Call the onUpdate function to update the frontend state (if provided)
        if (onUpdate) {
          onUpdate(userId, userRole);
        }

        onClose(); // Close the modal
        
      } else {
        toast.error("Failed to update role");
        console.error("Failed to update role:", responseJson.message);
      }
    } catch (error) {
      toast.error("Error updating user role");
      console.error("Error updating user role:", error);
    }
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-10 bg-slate-200 bg-opacity-50'>
      <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>

        <button className='block ml-auto' onClick={onClose}>
          <FaWindowClose />
        </button>

        <h1 className='pb-4 text-lg font-bold'>Change User Role</h1>

        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Current Role: {role}</p>

        <div className='flex items-center justify-between my-4'>
          <p>Role:</p>
          <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
            {Object.values(ROLE).map((role, index) => (
              <option 
              key={index} 
              value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <button
          className='bg-red-500 text-white px-4 py-2 rounded-full w-fit hover:bg-red-700 mx-auto block'
          onClick={updateUserRole}
        >
          Save Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
