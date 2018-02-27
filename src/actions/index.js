import * as types from './../constants/ActionTypes';
import v4 from 'uuid/v4';

export const nextLyric = (currentSongId) => ({
  type: types.NEXT_LYRIC,
  currentSongId
});

export const restartSong = (currentSongId) => ({
  type: types.RESTART_SONG,
  currentSongId
});

export const changeSong = (newSelectedSongId) => ({
  type: types.CHANGE_SONG,
  newSelectedSongId
});

export const requestSong = (title, localSongId) => ({
  type: types.REQUEST_SONG,
  title,
  songId: localSongId
});

export const receiveSong = (title, artist, songId, songArray) => ({
  type: types.RECEIVE_SONG,
  songId,
  title,
  artist,
  songArray,
  receivedAt: Date.now()
});

export const changeImage = (url) => ({
  type: types.CHANGE_IMAGE,
  url
});

//async action - .then waits for API response to return
export function fetchSongId(title) {
  return function(dispatch){
    const localSongId = v4();
    dispatch(requestSong(title, localSongId));
    title = title.replace(' ', '_');
    return fetch('http://api.musixmatch.com/ws/1.1/track.search?&q_track=' + title + '&page_size=1&s_track_rating=desc&apikey=86bd7d90f10da3ddcca488342fe9426f').then(
      response => response.json(),
      error => console.log('An error occured.', error)
    ).then(function(json){
      if (json.message.body.track_list.length > 0){
        const musicMatchId = json.message.body.track_list[0].track.track_id;
        const artist = json.message.body.track_list[0].track.artist_name;
        const title = json.message.body.track_list[0].track.track_name;
        fetchLyrics(title, artist, musicMatchId, localSongId, dispatch);
      } else {
        console.log('We could not locate a song under that ID!');
      }
    });
  };
}

export function fetchLyrics(title, artist, musicMatchId, localSongId, dispatch) {
  return fetch('http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=' + musicMatchId + '&apikey=86bd7d90f10da3ddcca488342fe9426f').then(
    response => response.json(),
    error => console.log('An error occurred.', error)
  ).then(function(json){
    if (json.message.body.lyrics){
      let lyrics = json.message.body.lyrics.lyrics_body;
      lyrics = lyrics.replace('"', '');
      const songArray = lyrics.split(/\n/g).filter(entry => entry!='');
      dispatch(receiveSong(title, artist, localSongId, songArray));
      dispatch(changeSong(localSongId));
    } else {
      console.log('We couldn\'t locate lyrics for this song!');
    }
  });
}



//86bd7d90f10da3ddcca488342fe9426f - musixmatch
// 2f509760-1b29-11e8-8784-e3318746e9d2 - harvard art museums api
//https://api.harvardartmuseums.org/object?classification=Paintings&keyword=bye&apikey=2f509760-1b29-11e8-8784-e3318746e9d2
