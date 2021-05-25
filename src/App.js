import React, { useEffect} from "react";
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from './Player';
import { useDataLayerValue } from "./DataLayer";

//super object
//responsible for interaction b/w spotify and app
const spotify = new SpotifyWebApi();

function App() {
  //to pull information from datalayer
  //if wanting to grab anything from data layer, put in object
  //dispatch used to update data layer with values 
  const [{ token }, dispatch] = useDataLayerValue();


  //runs code based on a given condition (useEffect (always runs a function))
  useEffect(() => {
    const hash = getTokenFromUrl();
    //reset
    window.location.hash = "";
    //access_token is inside object that gets returned
    const _token = hash.access_token;
 
    //sanity check
    if (_token /* Exists*/) {
      //dispatch an action
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
      //giving access token to spotify api
      spotify.setAccessToken(_token);
      //returns a promise   
      //get users information
      spotify.getMe().then((user) => {
        //pop it in the layer
        dispatch({
          type: "SET_USER",
          //getting back a user
          user: user,
        });
      });
      //call to api to get playlists, returns a promise
      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });

      spotify.getPlaylist("37i9dQZEVXcNKPF0a6y8Yw").then(response => {
        dispatch({
          type: "SET_DISCOVERY_WEEKLY",
          discover_weekly: response,
        })
      });
    }
  },/* only run once, put empty brackets, runs once right away, runs everytime variable/s in bracket changes*/ []);


  return (
    //BEM convention app instead of App
    <div className="app">{
      //conditional render
      token ? 
        <Player spotify={spotify}/>
        : <Login />}
    </div>
  );
}

export default App;
