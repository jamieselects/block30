export default function SearchBar({ setSearch }) {

  return (
    <>
      {/* Search input */}
      <h2>Search Books</h2>
      <input 
        type="text"
        placeholder="Search books "
        onChange={(event) => setSearch(event.target.value)}
      /> 
    </>
  );
}