import React, { useState, useEffect } from "react";
import Axios from "../utils/axiosManga";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Detail() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [feed, setFeed] = useState([]);
  const [images, setImages] = useState([]);
  const [chapterList, setChapterList] = useState({});

  const fetchFeed = async () => {
    try {
      const { data } = await Axios({
        url: `manga/${id}/feed?limit=100&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&includeFutureUpdates=1&order%5BcreatedAt%5D=asc&order%5BupdatedAt%5D=asc&order%5BpublishAt%5D=asc&order%5BreadableAt%5D=asc&order%5Bvolume%5D=asc&order%5Bchapter%5D=asc`,
        method: "GET",
      });
      console.log(data.data[0]);

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
      setChapterList(obj);
      console.log(obj);
      setFeed(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChapter = async (chapterId) => {
    try {
      const { data } = await Axios({
        url: `at-home/server/${chapterId}`,
        method: "GET",
      });
      let hash = data.chapter.hash;

      let perLink = data.chapter.data.map((e) => {
        return `https://uploads.mangadex.org/data/${hash}/${e}`;
      });
      setImages(perLink);
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
  console.log(test);

  return (
    <div>
      <ul>
        {Object.keys(chapterList).map((ch) => (
          <li key={ch}>{ch}</li>
        ))}
      </ul>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Chapters</th>
            <th scope="col">Read</th>
          </tr>
        </thead>
        <tbody>
          {test.map((el, idx) => {
            return (
              <tr key={idx}>
                <th scope="row">{el.attributes.volume}</th>
                <th scope="row">{el.attributes.chapter}</th>
                <td>
                  <button onClick={() => fetchChapter(el.id)}>Read</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        {images.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Page ${index}`} />
        ))}
      </div>
    </div>
  );
}
