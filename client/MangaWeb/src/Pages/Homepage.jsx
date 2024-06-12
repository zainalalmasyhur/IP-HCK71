import React, { useState, useEffect } from "react";
import Axios from "../utils/axiosManga";
import { Link } from "react-router-dom";

export default function Homepage() {
  const [manga, setManga] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const fetchManga = async (title) => {
    try {
      const { data } = await Axios({
        url: "/manga?limit=10&includedTagsMode=AND&excludedTagsMode=OR&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&order%5BlatestUploadedChapter%5D=desc",
        params: {
          title: title,
        },
        method: "GET",
      });

      const coversPromises = data.data.map(async (mangaItem) => {
        const coverId = mangaItem.relationships[2]?.id;
        if (coverId) {
          const coverData = await fetchCover(coverId);
          mangaItem.CoverUrl = coverData
            ? `https://uploads.mangadex.org/covers/${mangaItem.id}/${coverData}`
            : null;
          return mangaItem;
        }
        return null;
      });

      const resolvedCovers = await Promise.all(coversPromises);
      setManga(resolvedCovers.filter((item) => item !== null));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCover = async (id) => {
    try {
      const { data } = await Axios({
        url: `cover/${id}`,
        method: "GET",
      });
      return data.data.attributes.fileName;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Panggil fetchManga dengan judul yang ditentukan saat komponen dimuat
    fetchManga("SAIKI");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchInput.trim() !== "") {
      fetchManga(searchInput);
    }
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="container pt-5">
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchInput}
          onChange={handleChange}
        />
        <button
          className="btn"
          type="submit"
          style={{ backgroundColor: "#FF76CE" }}
        >
          Search
        </button>
      </form>
      <div className="row justify-content-start mt-5">
        {manga.map((mangaItem, idx) => (
          <div key={idx} className="col-md-4 mb-3">
            <Link to={`detail/${mangaItem.id}`} className="card h-100">
              <img
                style={{ height: "700px" }}
                src={
                  mangaItem.CoverUrl ||
                  "https://icon-icons.com/icons2/1933/PNG/512/iconfinder-image-broken-picture-photo-photography-4593158_122261.png"
                }
                className="card-img-top"
                alt="Cover"
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title text-center">
                    {mangaItem.attributes.title.en}
                  </h5>
                  <p className="card-text text-center">
                    {mangaItem.attributes.description &&
                      mangaItem.attributes.description.en &&
                      (mangaItem.attributes.description.en.length > 100
                        ? mangaItem.attributes.description.en.slice(0, 100) +
                          "..."
                        : mangaItem.attributes.description.en)}
                  </p>
                </div>
                <div className="text-center mt-auto">
                  <small className="text-body-secondary">
                    Last updated 3 mins ago
                  </small>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
