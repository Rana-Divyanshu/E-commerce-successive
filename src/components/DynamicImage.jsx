import axios from "axios";
import React, { useEffect, useState } from "react";

function DynamicImage({ title }) {
  // cx: "71f309b51f20c41d9", // Replace with your CX
  //   key: "AIzaSyAn9COvNpjrA4TY2YbGDNpqhO1xMVJ1UwA", // Replace with your API key
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchImage = async () => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/customsearch/v1",
        {
          params: {
            q: title, // Query (product title)
            searchType: "image",
            cx: "77f92fa1a19e34cbc",
            key: "AIzaSyDhxsPUwETNxT1U-curwfz4RjFignEMoO0",
            num: 1, // Number of results to fetch
          },
        }
      );

      if (response.data.items && response.data.items.length > 0) {
        setImageUrl(response?.data?.items[0]?.link); // Get the first image link
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    //   fetchImage();
  }, []);

  return loading ? (
    <div className="h-full w-full flex items-center justify-center outline-dashed outline-1">
      <div className="loader"></div>
    </div>
  ) : imageUrl?.length > 0 ? (
    <img
      src={imageUrl}
      alt={title}
      className="h-full w-auto"
      crossOrigin="anonymous"
    />
  ) : (
    <div className="h-full w-full flex items-center justify-center outline-dashed outline-1">
      <p className="font-normal">No Image</p>
    </div>
  );
}

export default DynamicImage;
