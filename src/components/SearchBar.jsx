import PropTypes from "prop-types";

const SearchBar = ({ searchTitle, onSearch }) => {
  return (
    <div className="note__search">
      <input
        type="text"
        placeholder="Search Todo ..."
        className="todo-input"
        value={searchTitle}
        onChange={onSearch}
      />
    </div>
  );
};

SearchBar.propTypes = {
  searchTitle: PropTypes.string,
  onSearch: PropTypes.func,
};

const SearchPages = ({ searchTitle, onSearch }) => {
  return (
    <div className="mb-3 p-0">
      <SearchBar searchTitle={searchTitle} onSearch={onSearch} />
    </div>
  );
};

SearchPages.propTypes = {
  searchTitle: PropTypes.string,
  onSearch: PropTypes.func,
};

export { SearchBar, SearchPages };
