import './App.css';
import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient(process.env.REACT_APP_SERVER_URL);


function App() {
  // const [first, setfirst] = useState("true")
  const [data, setData] = useState()
  const handleOnClick = async (event) => {
    let formData = {}
    if (event === "button1") {
      formData = {
        button1: "true",
        button2: "false",
        button3: "false"
      }

    }
    else if (event === "button2") {
      formData = {
        button1: "false",
        button2: "true",
        button3: "false"
      }

    }
    else {
      formData = {
        button1: "false",
        button2: "false",
        button3: "true"
      }

    }

    await fetch(`${REACT_APP_SERVER_URL}/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        console.log(response, first);

      } else {
        console.log('Error updating user');
      }
    }).catch((error) => console.error('Error:', error));
 
  }
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${REACT_APP_SERVER_URL}`);
      const jsonData = await response.json();
      setData(jsonData?.rows[0]);
      console.log(data, jsonData.rows);
    }
    fetchData();
  }, []);

 

  useEffect(() => {

    socket.on('dbUpdate', (data) => {
      setData(data)
      console.log(data)

    });

    return () => {
      socket.off('dbUpdate')
    };
  }, [socket]);


  return (
    <div className="App">
      <button onClick={() => handleOnClick("button1")} className={data?.button1 !== "true" ? "active" : "off__btn"}>
        OFF
      </button>
      <button className={data?.button2 !== "true" ? "active" : "on__btn"} onClick={() => handleOnClick("button2")}>
        ON
      </button>
      <button className={data?.button3 !== "true" ? "active" : "onof__btn"} onClick={() => handleOnClick("button3")}>
        ONoff
      </button>
    </div>
  );
}

export default App;
