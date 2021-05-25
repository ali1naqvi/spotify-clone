//only use capital letters for components
//https://developer.spotify.com/documentation/web-playback-sdk/quick-start/# 

//redirects to authorization when pressing the button 
//export allows constant to be used outside
export const authEndpoint = "https://accounts.spotify.com/authorize";

//brings back to home page after 
const redirectUri = "http://localhost:3000/";

const clientId = "bfe636b443b44e08a368d636ef02feb7";

//allows app to modify these from api
//read tells to read and not giving deletion ability
//permissions from api
const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state"
];

//get access token from URL 
export const getTokenFromUrl = () => {
    //goes to location where hash is in the UR; 
    return window.location.hash
        //get first substring
        .substring(1)
        //split when there is &
        .split('&')
        //reduce used to flatten arrays 
        .reduce((initial, item) => {
            //split between = and &
            let parts = item.split('=');
            // decodes a URI component
            initial[parts[0]] = decodeURIComponent(parts[1]);
            //
            return initial;
            //give empty object, what initial should start with
        }, {});
}

//back tics for allowing embedded expressions
//? for adding a parameter  
//join with ascii for space ($20)
//once authenticated, give back token (a string that represents your autentication)
//show dialog shows the prompt
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;