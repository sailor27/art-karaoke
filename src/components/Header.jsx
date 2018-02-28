import React from 'react';
import SongSearch from './SongSearch';

function Header(){
  var headerStyle = {

  };
  return (
    <div>
      <h1>Giphy Karaoke🖼</h1>
      <em>Search for a song:</em>
      <SongSearch />
    </div>
  );
}

export default Header;
