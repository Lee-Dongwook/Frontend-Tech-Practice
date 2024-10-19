import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Article from "../Article";
import type { ArticleProps } from "../Article";
import "./index.css";

type ArticleListProps = ArticleProps[];

export default function ArticleList() {
  const [articles, setArticles] = useState<ArticleListProps>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getArticles = async () => {
    try {
      const response = await axios.get("http://localhost:3001/articles");
      setArticles(response.data);
    } catch (err) {
      setError("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ul className="ArticleList" style={{ listStyle: "none", padding: 0 }}>
      {articles.map((item) => (
        <li key={item.id}>
          <Link
            to={`/view/${item.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Article {...item} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
