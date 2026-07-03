function SearchBar({ query, onChange, onSubmit }) {
  return (
    <form className="search-bar" onSubmit={onSubmit}>
      <input
        type="search"
        value={query}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search movies, actors, genres..."
        aria-label="Search movies"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
