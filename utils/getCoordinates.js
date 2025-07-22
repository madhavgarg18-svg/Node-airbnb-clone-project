// utils/getCoordinates.js
const axios = require("axios");

async function getCoordinates(location) {
  try {
    const response = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: location,
        format: "json",
        limit: 1,
      },
      headers: {
        "User-Agent": "YourAppName/1.0 (your@email.com)",
      },
    });

    if (response.data.length > 0) {
      return {
        latitude: parseFloat(response.data[0].lat),
        longitude: parseFloat(response.data[0].lon),
      };
    } else {
      return null;
    }
  } catch (err) {
    console.error("Geocoding error for:", location);
    return null;
  }
}

module.exports = getCoordinates;
