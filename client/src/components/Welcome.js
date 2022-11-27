import React, { useEffect, useState } from "react";
import axios from "axios";
// import Slider from './Slider';
import "../css/Welcome.css";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "react-bootstrap";
import Modal from "./Modal";
import Modal1 from "./Modal1";
export default function Welcome() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  //nft fetch in single run
  const { currentUser } = useAuth();
  const [NFTdata, setNFTData] = useState([]);
  const [userLogin, setUserLogin] = useState([]);
  const [loginData, setLoginData] = useState([]);
  const [username, setUserName] = useState("");
  const [type, setType] = useState("");
  const userEmail = currentUser.email;
  const loadNFT = async () => {
    const response = await axios.post("http://localhost:3001/nft/get", {
      userEmail: userEmail,
    });
    setNFTData(response.data);
  };
  const loadLogin = async () => {
    const response = await axios.get("http://localhost:3001/api/login");
    setLoginData(response.data);

    loginData.forEach((item, index) => {
      if (item.email === currentUser.email) {
        setUserName(item.first_name);
        setType(item.type);
      }
    });
  };

  const loadBalance = async () => {
    const response = await axios.post("http://localhost:3001/api/get", {
      userEmail: userEmail,
    });
    setUserLogin(response.data);
  };
  useEffect(() => {
    loadLogin();
  });

  useEffect(() => {
    loadNFT();
  });

  useEffect(() => {
    loadBalance();
  });

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ padding: "20px", color: "white", fontFamily: "cursive" }}
      >
        <div className="d-flex">
          <h1>Welcome,&nbsp;</h1>
          <h1 style={{ textTransform: "uppercase" }}>
            {username}&nbsp;
            <sup
              style={{
                fontFamily: "fantasy",
                padding: "2px",
                color: "grey",
                borderStyle: "dotted",
                borderRadius: "10px",
              }}
            >
              {type}
            </sup>
          </h1>
        </div>
      </div>

      <div
        style={{ color: "white", marginTop: "40px" }}
        className="d-flex justify-content-around align-items-center"
      >
        {modalOpen && <Modal setOpenModal={setModalOpen} />}
        {modalOpen1 && <Modal1 setOpenModal={setModalOpen1} />}

        <div>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <div
              style={{ fontSize: "30px" }}
              d-flex
              justify-content-center
              align-items-center
            >
              Current Balance: $
              {userLogin.map((item, index) => {
                return <>{item.bal_usd}</>;
              })}
            </div>
            <div
              style={{ fontSize: "30px" }}
              d-flex
              justify-content-center
              align-items-center
            >
              Current ETH: &nbsp;
              {userLogin.map((item, index) => {
                return <>{item.bal_eth === null || 0 ? 0 : item.bal_eth}</>;
              })}
            </div>
            <div
              style={{ marginTop: "30px" }}
              className="d-flex justify-content-around align-items-center"
            >
              <Button
                className="openModalBtn"
                onClick={() => {
                  setModalOpen(true);
                }}
                style={{ margin: "10px" }}
              >
                Add USD
              </Button>

              <Button
                className="openModalBtn1"
                onClick={() => {
                  setModalOpen1(true);
                }}
                style={{ margin: "10px" }}
              >
                Buy ETH
              </Button>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center flex-column">
          <h3>Your Holdings</h3>
          <div style={{ marginTop: "40px" }}>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Token ID</th>
                  <th>Price(ETH)</th>
                </tr>
              </thead>
              <tbody>
                {NFTdata.map((item, index) => {
                  return (
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.token_id}</td>
                      <td>{item.price_eth}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/* <div
          className="d-flex justify-content-around align-items-center"
          style={{ padding: "20px" }}
        >
          <Link to="/buynft">
            <button className="rounded bg-success" style={{ padding: "10px" }}>
              Buy NFT
            </button>
          </Link>
          <Link to="/sellnft">
            <button className="rounded bg-danger" style={{ padding: "10px" }}>
              Sell NFT
            </button>
          </Link>
        </div> */}
      </div>
    </>
  );
}
