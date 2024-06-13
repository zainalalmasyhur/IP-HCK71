import React, { useState, useEffect } from "react";
import Axios from "../utils/axiosManga";
import AxiosServer from "../utils/axios";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import showToast from "../utils/toast";

export default function Chapter() {
  const { chapterId } = useParams();
  const [chapters, setChapters] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [hasMoreChapters, setHasMoreChapters] = useState(true);
  const [currentChapterId, setCurrentChapterId] = useState(chapterId);

  useEffect(() => {
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
        setChapters((prevChapters) => [
          ...prevChapters,
          { id: chapterId, images: perLink },
        ]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchChapter(chapterId);
  }, [chapterId]);

  const fetchComments = async () => {
    try {
      const { data } = await AxiosServer({
        url: `/comments/${currentChapterId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setComments(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [currentChapterId]);

  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      try {
        const { data } = await AxiosServer({
          url: `/comments`,
          method: "POST",
          data: { comment: newComment, ChapterId: currentChapterId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        fetchComments(); // Refresh comments
        setNewComment("");
      } catch (error) {
        console.error("Error submitting comment:", error);
        showToast(error.response?.data?.message || error.message);
      }
    }
  };

  const handleEditComment = async (id, updatedComment) => {
    try {
      const { data } = await AxiosServer({
        url: `/comments/${id}`,
        method: "PUT",
        data: { comment: updatedComment },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (data.updatedComment.ChapterId === currentChapterId) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === id ? data.updatedComment : comment
          )
        );
      }
    } catch (error) {
      console.log(error);
      showToast(error.response?.data?.message || error.message);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await AxiosServer({
        url: `/comments/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== id)
      );
    } catch (error) {
      console.log(error);
      showToast(error.response?.data?.message || error.message);
    }
  };

  const fetchNextChapter = async () => {
    const nextChapterId = getNextChapterId(currentChapterId);
    console.log(`Fetching next chapter with ID: ${nextChapterId}`);

    if (nextChapterId) {
      try {
        const { data } = await Axios({
          url: `at-home/server/${nextChapterId}`,
          method: "GET",
        });
        let hash = data.chapter.hash;
        let perLink = data.chapter.data.map((e) => {
          return `https://uploads.mangadex.org/data/${hash}/${e}`;
        });
        setChapters((prevChapters) => [
          ...prevChapters,
          { id: nextChapterId, images: perLink },
        ]);
        setCurrentChapterId(nextChapterId);
      } catch (error) {
        console.log(`Error fetching next chapter ${nextChapterId}:`, error);
        setHasMoreChapters(false); // No more chapters if error
      }
    } else {
      setHasMoreChapters(false);
    }
  };
  const getNextChapterId = (currentId) => {
    const nextId = parseInt(currentId) + 1;
    return nextId.toString();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        fontFamily: "'Arial', sans-serif",
      }}
    >
      <InfiniteScroll
        dataLength={chapters.length}
        next={fetchNextChapter}
        hasMore={hasMoreChapters}
        loader={<h4>Loading...</h4>}
      >
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Align items in the center horizontally
            }}
          >
            {chapter.images.map((imageUrl, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <img
                  src={imageUrl}
                  alt={`Page ${index}`}
                  style={{
                    maxWidth: "100%",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </InfiniteScroll>
      <div
        style={{
          width: "100%",
          marginTop: "20px",
          borderTop: "1px solid #ccc",
          paddingTop: "20px",
        }}
      >
        <h3>Comments</h3>
        {comments.map((comment) => (
          <div
            key={comment.id}
            style={{
              marginBottom: "10px",
              padding: "15px",
              border: "1px solid #eee",
              borderRadius: "10px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.02)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <p>
              <strong>{comment?.User?.username}</strong>: {comment.comment}
            </p>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button
                onClick={() =>
                  handleEditComment(
                    comment.id,
                    prompt("Edit comment:", comment.comment)
                  )
                }
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#45a049")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#4CAF50")
                }
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteComment(comment.id)}
                style={{
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#e53935")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f44336")
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows="2"
          cols="50"
          placeholder="Add a comment"
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            resize: "none",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        />
        <button
          onClick={handleAddComment}
          style={{
            backgroundColor: "#008CBA",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#007bb5")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#008CBA")
          }
        >
          Submit
        </button>
      </div>
    </div>
  );
}
