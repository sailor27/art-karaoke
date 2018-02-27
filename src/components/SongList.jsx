import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { restartSong, changeSong, changeImage } from './../actions';

const SongList = ({ dispatch, songList }) => {
  let action;
  dispatch(changeImage('https://media.giphy.com/media/brwknFAZxzfRm/giphy.gif'));
  return (
    <div>
      <em>Or select from our list:</em>
      {Object.keys(songList).map(songId => {
        let song = songList[songId];
        return <li key = {songId} onClick = {() => {
          if (song.arrayPosition > 0){
            dispatch(restartSong(songId));
          }
          dispatch(changeSong(songId));
        }}>
          {song.title} by {song.artist} </li>;
      })}
    </div>
  );
};

SongList.propTypes = {
  songList: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    songList: state.songsById
  };
};

export default connect(mapStateToProps)(SongList);
