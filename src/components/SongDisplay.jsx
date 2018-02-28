import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { nextLyric, restartSong, changeImage, fetchGif } from './../actions';

const SongDisplay = ({ dispatch, song, image }) => {
  console.log(image.url);

  const { title, artist, songArray, arrayPosition, id } = song;
  const currentLine = songArray[arrayPosition];
  const heMan = 'https://media.giphy.com/media/M7gtacN7aPNsc/giphy.gif';
  let cutLine = currentLine.split(' ');
  return (
    <div>
      <h1>{title}</h1>
      <h4>{artist}</h4>
      <div>

      </div>
      <hr/>
      <div onClick={e => {
        e.preventDefault();
        if(!(arrayPosition === songArray.length - 1)) {
          dispatch(nextLyric(id));
          for (let i = 0; i < cutLine.length; i++){
            setInterval(dispatch(fetchGif(cutLine[i])), 100000);
            console.log('🖼 ' + cutLine[i]);
            // dispatch(fetchGif(cutLine[i]));
          }
          // dispatch(fetchGif(title));
        } else {
          dispatch(restartSong(id));
          dispatch(changeImage(heMan));
        }
      }}>
        <h1>
          {currentLine}
        </h1>
        <img style={{height: '400px'}}
          src={image.url}/>

        <h3>{image.url}</h3>
      </div>
    </div>
  );
};

SongDisplay.propTypes = {
  song: PropTypes.object,
  id: PropTypes.number,
  title: PropTypes.string,
  artist: PropTypes.string,
  songArray: PropTypes.array,
  arrayPosition: PropTypes.number,
  dispatch: PropTypes.func,
  image: PropTypes.object
};

const mapStateToProps = state => {
  const image = state.image;
  const song = state.songsById[state.currentSongId];
  const songInfo = {
    id: song.songId,
    artist: song.artist,
    title: song.title,
    songArray: song.songArray,
    arrayPosition: song.arrayPosition
  };
  return {
    song: songInfo,
    image: image
  };
};

export default connect(mapStateToProps)(SongDisplay);
