import React, { useEffect, useState } from "react";
import "./UsersList.css";
import "antd/dist/antd.css";
import { AiFillDelete, AiFillEdit, AiFillSave } from "react-icons/ai";
import MyPagination from "./Pagination";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [wholeData,setWholeData] = useState([])
  const [filteredData,setFilteredData] = useState([])


  useEffect(() => {
    getUsersDetailsData();
  }, []);
  const getUsersDetailsData = () => {
    fetch(
      `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
    )
      .then((res) => res.json())
      .then((data) => {
        if(data&&data.length) setUsers(data.slice(0,10));
        setWholeData(data)
        setFilteredData(data)
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const deleteUser = (selectedUser) => {
    let dataAfterDelete = filteredData.filter((user) => {
      return user.id !== selectedUser;
    })
    setUsers(dataAfterDelete.slice(0,10));
    setFilteredData(dataAfterDelete)
  };


  const editUserDetails = (selectedUser) => {
      setFilteredData((prevFilteredData) => {
        let newFilteredData = prevFilteredData.map((el) => {
          if(el.id==selectedUser) el.edit=true;
          return el;
        });
        return newFilteredData;
      });
      setUsers((prevUser) => {
        let newUsers = prevUser.map((el, idx) => {
          if (el.id == selectedUser) el.edit = true;
          return el;
        });
        return newUsers;
      });
  };

  const saveUserDetails =(selectedUser) => {
      setFilteredData((prevFilteredData) => {
        let newFilteredData = prevFilteredData.map((el) => {
          if(el.id==selectedUser) el.edit=false;
          return el;
        });
        return newFilteredData;
      });
      setUsers((prevUser) => {
        let newUsers = prevUser.map((el, idx) => {
          if (el.id == selectedUser) el.edit = false;
          return el;
        });
        return newUsers;
      });
  };
  
  return (
    <div className="box">
      <h1>ADMIN UI</h1>
      <br />
      <input
        style={{ border: "2px solid lightblue" }}
        type="text"
        name="name"
        placeholder=" Search by any field "
        onChange={(e) => {
          let value = e.target.value;
          let newFilteredData = wholeData.filter((user) => {
            if (value === "") return user;
            else if (
              user.name.includes(value) ||
              user.email.includes(value) ||
              user.role.includes(value)
            ) {
              return user;
            }
          });
          setFilteredData(newFilteredData);
          if (newFilteredData) setUsers(newFilteredData.slice(0, 10));
        }}
      />

      <table className="mytable">
        <tr>
          <th>
            <input
              onChange={(e) => {
                setFilteredData((prevFilteredData) => {
                  let newFilteredData = prevFilteredData.map((el) => {
                    el.checked = e.target.checked;
                    return el;
                  });
                  return newFilteredData;
                });
                setUsers((prevUser) => {
                  let newUsers = prevUser.map((el, idx) => {
                    el.checked = e.target.checked;
                    return el;
                  });
                  return newUsers;
                });
              }}
              type="checkbox"
            />{" "}
          </th>
          <th>Name </th>
          <th>Email </th>
          <th> Role</th>
          <th>Action</th>
        </tr>

        {users.map((user) => (
          <tr key={user.id}>
            <input
              type="checkbox"
              checked={user.checked}
              onChange={(e) => {
                setFilteredData((prevFilteredData) => {
                  let newFilteredData = prevFilteredData.map((el) => {
                    if (el.id == user.id) el.checked = e.target.checked;
                    return el;
                  });
                  return newFilteredData;
                });
                setUsers((prevUser) => {
                  let newUsers = prevUser.map((el, idx) => {
                    if (el.id == user.id) el.checked = e.target.checked;
                    return el;
                  });
                  return newUsers;
                });
              }}
            />

            <td>
              {" "}
              {user.edit ? (
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => {
                    setFilteredData((prevFilteredData) => {
                      let newFilteredData = prevFilteredData.map((el) => {
                        if (el.id == user.id) el.name = e.target.value;
                        return el;
                      });
                      return newFilteredData;
                    });
                    setUsers((prevUser) => {
                      let newUsers = prevUser.map((el, idx) => {
                        if (el.id == user.id) el.name = e.target.value;
                        return el;
                      });
                      return newUsers;
                    });
                  }}
                />
              ) : (
                user.name
              )}{" "}
            </td>
            <td>
              {" "}
              {user.edit ? (
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => {
                    setFilteredData((prevFilteredData) => {
                      let newFilteredData = prevFilteredData.map((el) => {
                        if (el.id == user.id) el.email = e.target.value;
                        return el;
                      });
                      return newFilteredData;
                    });
                    setUsers((prevUser) => {
                      let newUsers = prevUser.map((el, idx) => {
                        if (el.id == user.id) el.email = e.target.value;
                        return el;
                      });
                      return newUsers;
                    });
                  }}
                />
              ) : (
                user.email
              )}{" "}
            </td>
            <td> {user.edit?<select value={user.role}
             onChange={(e)=>{
                  setFilteredData((prevFilteredData) => {
                    let newFilteredData = prevFilteredData.map((el) => {
                      if (el.id == user.id) el.role = e.target.value;
                      return el;
                    });
                    return newFilteredData;
                  });
                  setUsers((prevUser) => {
                    let newUsers = prevUser.map((el, idx) => {
                      if (el.id == user.id)el.role = e.target.value;
                      return el;
                    });
          
                    return newUsers;
                  });
             }}
            >
               <option value="member">member</option>
               <option value="admin">admin</option>
            </select>:user.role} </td>
            <td className="btn">
              {user.edit ? (
                <button className="save" onClick={() => saveUserDetails(user.id)}>
                  {" "}
                  <AiFillSave />{" "}
                </button>
              ) : (
                <button className="edit" onClick={() => editUserDetails(user.id)}>
                  {" "}
                  <AiFillEdit />{" "}
                </button>
              )}
              <button className="delete" onClick={() => deleteUser(user.id)}>
                {" "}
                <AiFillDelete />{" "}
              </button>
            </td>
          </tr>
        ))}

        <button
          className="deleteSelected"
          onClick={() => {
            setFilteredData((prevFilteredData) => {
              let newFilteredData = prevFilteredData.filter((el) => {
                return !el.checked;
              });
              setUsers(newFilteredData.slice(0, 10));
              return newFilteredData;
            });
          }}
          style={{ border: "none", color: "red",cursor:'pointer' }}
        >
          Delete Selected
        </button>
      </table>
      <br />
      <br />
      <MyPagination data={filteredData} setUsers={setUsers} count={10} />
    </div>
  );
}

export default UsersList;
