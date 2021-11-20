import { useQuery } from "@apollo/client";
import { useState } from "react";
import { getBooksQuery } from "../queries";
import BookDetails from "./bookDetails";

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [selected, setSelected] = useState(null);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error!</p>
      ) : (
        <ul className="book_list">
          {data?.books?.map((book) => {
            return (
              <li
                key={book.id}
                className="list_item"
                onClick={() => setSelected(book.id)}
              >
                {book.name}
              </li>
            );
          })}
        </ul>
      )}
      <BookDetails bookId={selected} />
    </div>
  );
};

export default BookList;
