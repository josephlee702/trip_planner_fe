import api from "../services/api"; 
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AssetForm from "../components/AssetForm";
import AssetList from "../components/AssetList";

const PortfolioPage = ({ darkMode }) => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [assets, setAssets] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const uid = localStorage.getItem("uid");
  
  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!token || !client || !uid) {
        console.error("Missing authentication details.");
        return;
      }

      try {
        const response = await api.get(`/portfolios/${id}`, {
          headers: {
            "access-token": token,
            "client": client,
            "uid": uid,
          },
        });
        setPortfolio(response.data);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      }
    };
    fetchPortfolio();
  }, [id, token, client, uid]);

  useEffect(() => {
    if (portfolio) {
      const fetchAssets = async () => {
        if (!token || !client || !uid) {
          console.error("Missing authentication details.");
          return;
        }

        try {
          const response = await api.get(`/portfolios/${id}/assets`, {
            headers: {
              "access-token": token,
              "client": client,
              "uid": uid,
            },
          });
          setAssets(response.data);
        } catch (error) {
          console.error("Error fetching assets", error);
        }
      };
      fetchAssets();
    }
  }, [id, portfolio, token, client, uid]); 

  const handleCreateAsset = async (newAsset) => {
    setErrorMessage("");

    if (!token || !client || !uid) {
      setErrorMessage("Missing authentication details.");
      return;
    }

    try {
      const response = await api.post(`/portfolios/${id}/assets`, newAsset, {
        headers: {
          "access-token": token,
          "client": client,
          "uid": uid,
        },
      });

      setAssets([...assets, response.data]);
    } catch (error) {
      if (error.response) {
        const errorMsg = error.response.data.errors || "Error creating asset.";
        setErrorMessage(errorMsg);
      } else {
        setErrorMessage("Error creating asset.");
      }
    }
  };

  const handleDeleteAsset = async (assetId) => {
    if (!token || !client || !uid) {
      setErrorMessage("Missing authentication details.");
      return;
    }

    try {
      const response = await api.delete(`/portfolios/${id}/assets/${assetId}`, {
        headers: {
          "access-token": token,
          "client": client,
          "uid": uid,
        },
      });

      setAssets(assets.filter((asset) => asset.id !== assetId));
    } catch (error) {
      console.error("Error deleting asset:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className={`display-4 ${darkMode ? "text-light" : "text-dark"}`}>
        {portfolio ? portfolio.name : "Portfolio does not exist."}
      </h1>

      <AssetForm
        handleCreateAsset={handleCreateAsset}
        errorMessage={errorMessage}
      />

      <AssetList assets={assets} handleDeleteAsset={handleDeleteAsset} />
    </div>
  );
};

export default PortfolioPage;