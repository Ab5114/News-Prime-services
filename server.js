require("dotenv").config();

const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());
const API_KEY = process.env.NEWS_API_KEY;
 
app.get("/api/news", async(req, res) => {
  const { search, pageSize, page } = req.query;
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}&pageSize=${pageSize}&page=${page}`
    );
     if (response.status === 200) {
       res.json(response.data);
     } else {
       res
         .status(response.status)
         .json({ error: "Failed to fetch data from API" });
     }
  } catch (error) {
    console.error("Error fetching data:", error);    
    res.status(500).json({ error: "Error fetching news data" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;