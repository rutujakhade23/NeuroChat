import axios from "axios";

const searchWeb = async (query) => {
  try {
    const response = await axios.get(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`
    );

    return response.data.AbstractText || "No results found";
  } catch (err) {
    console.log(err);
    return "Unable to fetch web results";
  }
};

export default searchWeb;