import React, { useState, useEffect, useContext } from 'react';
import LinkItem from './LinkItem';
import FirebaseContext from '../Firebase/context';

function SearchLinks() {
  const { firebase } = useContext(FirebaseContext);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [links, setLinks] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    getInitialLinks();
  }, []);

  function getInitialLinks() {
    firebase.db
      .collection('links')
      .get()
      .then((snapshot) => {
        const links = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setLinks(links);
      });
  }

  function handleSearch(event) {
    event.preventDefault();
    const query = filter.toLowerCase();
    const matchedLinks = links.filter((link) => {
      return (
        link.description.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query) ||
        link.postedBy.name.toLowerCase().includes(query)
      );
    });
    setFilteredLinks(matchedLinks);
  }
  return (
    <div className="search">
      <form className="search-form" onSubmit={handleSearch}>
        <input className="search-bar" onChange={(event) => setFilter(event.target.value)} />
        <button className="search-button" type="submit">Search</button>
      </form>
      {filteredLinks.map((filteredLink, index) => (
        <LinkItem
          key={filteredLink.id}
          showCount={false}
          link={filteredLink}
          index={index}
        />
      ))}
    </div>
  );
}

export default SearchLinks;
