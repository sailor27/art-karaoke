import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { restartSong, changeSong } from './../actions';

const SongList = ({ dispatch, songList }) => {

  console.log(songList);
  let action;
  return (
    <div>
      <em>Or select from our list:</em>
      {Object.keys(songList).map(songId => {
        let song = songList[songId];
        console.log(song);
        return <li key = {songId} onClick = {() => {
          if (song.arrayPosition > 0){
            dispatch(restartSong(songId));
          }
          dispatch(changeSong(songId));
        }}>
          {song.title} by {song.artist}
          <img src={song.imageURL}></img></li>;
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
