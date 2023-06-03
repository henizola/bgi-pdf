// server.js
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Proxy route to fetch and serve the PDF file
app.get("/", async (req, res) => {
  try {
    const { file, description } = req.query;

    // Make a request to fetch the PDF file from the external server
    const response = await axios.get(file, {
      responseType: "arraybuffer",
      headers: {
        "Access-Control-Allow-Origin": "*", // Optional: Set appropriate CORS headers
      },
    });

    // Set response headers for file download
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${description}.pdf"`,
    });

    // Send the PDF file as the response
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving PDF file");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
