export const initialState = {
    user: null,
    playlist: [],
    playing: false,
    item: null,
    token: null,
};

//state of data layer 
//action manipulates what datalayer looks like
const reducer = (state, action) => {


    //action -> type , [payload]
    //payload dynamic, can be called anything

    //when pushing user in data layer, we dispatch action
    //action has two things, type
    switch (action.type) {
        case 'SET_USER':
            return {
                //keep whatever is in current state
                ...state,
                user: action.user
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            }
        
        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists: action.playlists,
            }
        
        case 'SET_DISCOVERY_WEEKLY':
            return {
                ...state,
                discover_weekly: action.discover_weekly,
            }
        default:
            return state;
    }
}
 
export default reducer;