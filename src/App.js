import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [name_edit, setName_edit] = useState("");
  const [address_edit, setAddress_edit] = useState("");
  const [data, setData] = useState([]);
  const [editKey, setKeyEdit] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let old_data = localStorage.getItem("data");
    let cover_old_data = old_data ? JSON.parse(old_data) : [];
    setData(cover_old_data);
  };

  const add = () => {
    let old_data = localStorage.getItem("data");
    let cover_old_data = old_data ? JSON.parse(old_data) : [];
    let data = [];
    data.push(...cover_old_data, { name: name, address: address });
    localStorage.setItem("data", JSON.stringify(data));
    setData(data);
    setName("");
    setAddress("");
  };

  const edit = (item, key) => {
    setKeyEdit(key);
  };

  const save = () => {
    setKeyEdit(null);
    localStorage.setItem("data", JSON.stringify(data));
    getData();
  };

  const onChangeEdit = (e) => {
    let i_new = [...data];
    i_new[e.target.dataset.id][e.target.name] = e.target.value;
    setData(i_new);
  };

  const Delete = (key) => {
    let i_delete = [...data];
    i_delete.splice(key, 1);
    localStorage.setItem("data", JSON.stringify(i_delete));
    setData(i_delete);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">CRUD REACT</div>
        <div className="card-body">
          <div className="row">
            <div className="col-1">
              <span>Name</span>
            </div>
            <div className="col-4">
              <input onChange={(e) => setName(e.target.value)} value={name} />
            </div>
            <div className="col-2">
              <span>Address</span>
            </div>
            <div className="col-4">
              <input
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </div>
            <div className="col-1">
              <button className="btn btn-primary" onClick={() => add()}>
                Add
              </button>
            </div>
          </div>

          <div className="row">
            {data.map((item, key) => {
              return (
                <div
                  key={key}
                  className="card"
                  style={{ width: "18rem", margin: "10px" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    {editKey === key ? (
                      <input
                        data-id={key}
                        name="name"
                        onChange={(e) => {
                          onChangeEdit(e);
                        }}
                        value={item.name}
                      />
                    ) : null}
                    <p className="card-text">{item.address}</p>

                    {editKey === key ? (
                      <input
                        data-id={key}
                        name="address"
                        onChange={(e) => {
                          onChangeEdit(e);
                        }}
                        value={item.address}
                      />
                    ) : null}

                    <div style={{ textAlign: "right" }}>
                      {editKey === key ? (
                        <a
                          href="#"
                          className="btn btn-primary"
                          onClick={() => save(item, key)}
                        >
                          save
                        </a>
                      ) : (
                        <>
                          <a
                            href="#"
                            className="btn btn-warning"
                            onClick={() => edit(item, key)}
                          >
                            Edit
                          </a>
                          <a
                            href="#"
                            className="btn btn-danger"
                            onClick={() => Delete(key)}
                          >
                            Delete
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
