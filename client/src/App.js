import AddBook from "./components/addBook";
import BookList from "./components/bookList";

const App = () => {
  return (
    <div className="App">
      <h1>Book store with GraphQl</h1>
      <BookList />
      <AddBook />
    </div>
  );
};

export default App;
