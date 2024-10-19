import React from "react";
import "./index.css";

export interface ArticleProps {
  title: string;
  content: string;
  createdTime: string;
  image: string;
  id?: number;
}

const zeroPad = (value: number, len: number): string => {
  const str = "0000000000" + value.toString();
  return str.substring(str.length - len);
};

const getParametersForUnsplash = ({
  width,
  height,
  quality,
  format,
}: {
  width: number;
  height: number;
  quality: any;
  format: any;
}) => {
  return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`;
};

const removeSpecialCharacter = (str: string) => {
  return str.substring(0, 300).replace(/[#_*~&;![\]`>\n=\->]/g, "");
};

export default function Article(props: ArticleProps) {
  const createdTime = new Date(props.createdTime);

  return (
    <div className={"Article"}>
      <div className={"Article__summary"}>
        <div className={"Article__summary__title"}>{props.title}</div>
        <div className={"Article__summary__desc"}>
          {removeSpecialCharacter(props.content)}
        </div>
        <div className={"Article__summary__etc"}>
          {createdTime.getFullYear() +
            "." +
            zeroPad(createdTime.getMonth() + 1, 2) +
            "." +
            zeroPad(createdTime.getDate(), 2)}
        </div>
      </div>
      <div className={"Article__thumbnail"}>
        <img
          src={
            props.image +
            getParametersForUnsplash({
              width: 240,
              height: 240,
              quality: 80,
              format: "jpg",
            })
          }
          alt="thumbnail"
        />
      </div>
    </div>
  );
}
