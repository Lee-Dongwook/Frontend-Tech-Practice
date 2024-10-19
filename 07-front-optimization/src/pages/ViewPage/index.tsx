import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";

import "./index.css";
import BasicTemplates from "../../template/BasicTemplate";
import CodeBlock from "../../components/Markdown";

// 게시글 타입 정의
interface Article {
  id: number;
  title: string;
  content: string;
  image: string;
}

function ViewPage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 게시글 가져오기
  const getArticle = useCallback(async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:3001/articles/${id}`);
      setArticle(response.data);
    } catch (err) {
      setError("Failed to load article");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      getArticle(id);
    }
  }, [getArticle, id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return article ? (
    <BasicTemplates>
      <div className="ViewPage">
        <h1 className="ViewPage__title">{article.title}</h1>
        <img className="ViewPage__image" src={article.image} alt="thumbnail" />
        <div className="ViewPage__content">
          <ReactMarkdown
            children={article.content}
            components={{
              code({ node, className, children, ...props }) {
                return (
                  <CodeBlock language={""} value={""} {...props}></CodeBlock>
                );
              },
            }}
          />
        </div>
      </div>
    </BasicTemplates>
  ) : (
    <h1>No article found</h1>
  );
}

export default ViewPage;
