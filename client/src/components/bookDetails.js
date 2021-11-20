import { useQuery } from "@apollo/client";
import React from "react";
import { getBookById } from "../queries";

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(getBookById, {
    variables: { id: bookId },
  });

  return (
    <div className="book_details">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>No book selected</p>
      ) : data ? (
        <div key={data?.book?.id}>
          <h2>{data?.book?.name}</h2>
          <p className="book_genre">{data?.book?.genre}</p>
          <p className="book_author">{data?.book?.author?.name}</p>
          <p>All books by this author</p>
          <ul className="related_book_list">
            {data?.book?.author?.books?.map((book) => {
              return <li key={book.id}>{book.name}</li>;
            })}
          </ul>
        </div>
      ) : (
        <p>No book selected</p>
      )}
    </div>
  );
};

export default BookDetails;
