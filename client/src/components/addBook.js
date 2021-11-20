import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries";

const AddBook = () => {
  const [form, setForm] = useState({
    name: "",
    genre: "",
    authorId: "",
  });
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook, book] = useMutation(addBookMutation);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.genre && form.authorId)
      addBook({
        variables: {
          name: form.name,
          genre: form.genre,
          authorId: form.authorId,
        },
        refetchQueries: [{ query: getBooksQuery }],
      });
  };

  useEffect(() => {
    if (book.data) {
      setForm({
        name: "",
        genre: "",
        authorId: "",
      });
    }
  }, [book]);

  return (
    <div>
      {book.loading && loading ? (
        <p>Loading...</p>
      ) : book.error && error ? (
        <p>Error!</p>
      ) : (
        <ul className="book_list">
          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <label className="form_label" htmlFor="name">
                Book Name
              </label>
              <input
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                value={form.name}
                placeholder="book name"
                type="text"
                className="form_control"
                id="name"
              />
            </div>
            <div className="form_group">
              <label className="form_label" htmlFor="genre">
                Genre
              </label>
              <input
                onChange={(e) => setForm({ ...form, genre: e.target.value })}
                value={form.genre}
                placeholder="genre name"
                type="text"
                className="form_control"
                id="genre"
              />
            </div>
            <div className="form_group">
              <label className="form_label" htmlFor="authorId">
                Author
              </label>
              <select
                onChange={(e) => setForm({ ...form, authorId: e.target.value })}
                value={form.authorId}
                className="form_control"
                id="authorId"
              >
                <option value="0">Select Author</option>
                {data?.authors?.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              +
            </button>
          </form>
        </ul>
      )}
    </div>
  );
};

export default AddBook;
