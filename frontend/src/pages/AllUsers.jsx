import React, { useState, useEffect } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]); 
  const [openUpdateRole, setOpenUpdateRole] = useState(false);

  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: ""
  });

  const fetchAllUsers = async () => {
    try {
      const fetchData = await fetch(SummaryApi.allUsers.url, {
        method: SummaryApi.allUsers.method,
        credentials: 'include'
      });

      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllUsers(dataResponse.data);
      }

      if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error('Error fetching users.');
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleEditClick = (user) => {
    setUpdateUserDetails({
      email: user.email,
      name: user.name,
      role: user.role,
      _id: user._id
    });
    setOpenUpdateRole(true);
  };

  // Function to update the user's role in the frontend state
  const handleRoleUpdate = (userId, newRole) => {
    setAllUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  return (
    <div className='bg-white p-4'>
      <table className='w-full userTable'>
        <thead>
          <tr className='bg-black text-white'>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((el, index) => ( // Changed from allUser to allUsers
            <tr key={el._id}>
              <td>{index + 1}</td>
              <td>{el?.name}</td>
              <td>{el?.email}</td>
              <td>{el?.role}</td>
              <td>{moment(el?.createdAt).format('LL')}</td>
              <td>
                <button
                  className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                  onClick={() => handleEditClick(el)}
                >
                  <MdModeEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openUpdateRole && (
        <ChangeUserRole
          userId={updateUserDetails._id}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          onClose={() => setOpenUpdateRole(false)}
          onUpdate={handleRoleUpdate} // Pass the update function
        />
      )}
    </div>
  );
};

export default AllUsers;
