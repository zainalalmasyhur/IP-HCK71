import React, { useState, useEffect } from "react";
import Axios from "../utils/axiosManga";
import { useParams, useNavigate } from "react-router-dom";

export default function Detail() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [feed, setFeed] = useState([]);
  // const [chapterList, setChapterList] = useState({});
  const languages = ["en"];

  const fetchFeed = async () => {
    try {
      const { data } = await Axios({
        url: `manga/${id}/feed?limit=100&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&includeFutureUpdates=1&order%5BcreatedAt%5D=asc&order%5BupdatedAt%5D=asc&order%5BpublishAt%5D=asc&order%5BreadableAt%5D=asc&order%5Bvolume%5D=asc&order%5Bchapter%5D=asc`,
        method: "GET",
        params: {
          translatedLanguage: languages,
        },
      });
      // console.log(data.data[0]);

      let obj = {};
      data.data.forEach(({ attributes, id }) => {
        let { volume, chapter } = attributes;
        if (!obj[volume]) {
          obj[volume] = {
            chapter: {},
          };
        }
        obj[volume].chapter[chapter] = "at-home/server/" + id;
      });
      // setChapterList(obj);
      // console.log(obj);
      setFeed(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const test = feed.toSorted(
    (a, b) => a.attributes.chapter - b.attributes.chapter
  );

  return (
    <div className="container table-container">
      <h1 className="mt-5 mb-3">Chapter List</h1>
      <div className="table-wrapper">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Chapters</th>
              <th scope="col">Volume</th>
              <th scope="col">Read</th>
            </tr>
          </thead>
          <tbody>
            {test.map((el, idx) => {
              return (
                <tr key={idx}>
                  <td>{el.attributes.chapter}</td>
                  <td>{el.attributes.volume}</td>
                  <td className="btn-container">
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/homepage/chapter/${el.id}?mangaId=`)}
                    >
                      Read
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
