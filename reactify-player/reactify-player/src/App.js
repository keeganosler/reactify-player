import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    
    constructor(props){
        super(props);
        this.state={
            token:"",
            deviceId:"",
            loggedIn:false,
            error:"",
            trackName:"Song Name",
            artistName:"Artist Name",
            albumName:"Album Name",
            playing:false,
            position:0,
            duration:0,
        };
        this.playerCheckInterval=null;
    }
    
  render() {
      const { 
          token,
          loggedIn,
          artistName,
          trackName,
          albumName,
          error,
          position,
          duration,
          playing,
      } = this.state;
      
      return (
          <div className="App">
             <div className="App-header">
                <h2>Spotify Web Player</h2>
                <div className="buttongroup">
                    <button><a href="https://keeganosler.com"><i class="fa fa-user"></i></a></button>
                    <button><a href=""><i class="fa fa-github"></i></a></button>
                    <button><a href=""><i class="fa fa-linkedin"></i></a></button>
                </div>
             </div>
             {error && <p>Error: {error}</p>}
             {loggedIn ?
              (<div>
                <h5>Currently Playing:</h5><h4>{trackName}</h4>
                <h5>By:</h5><h4>{artistName}</h4>
                <h5>From the Album:</h5><h4>{albumName}</h4>
                <p>
                    <button onClick={() => this.onPrevClick()}><i class="fa fa-backward"></i></button>
                    <button onClick={() => this.onPlayClick()}>{playing ? <i class="fa fa-pause"></i> : <i class="fa fa-play-circle"></i>}</button>
                    <button onClick={() => this.onNextClick()}><i class="fa fa-forward"></i></button>
                </p>
              </div>)
              :
              (<div>
                <h3 className="App-intro">
                    Enter your Spotify access token. Get it from{" "}<a href="https://beta.developer.spotify.com/documentation/web-playback-sdk/quick-start/#authenticating-with-spotify">here</a>.
                </h3><h3>You will need a Spotify account to proceed.</h3>
`               <h3>
                    <input type="text" value={token} onChange={e => this.setState({ token: e.target.value })} />
                </h3>
                <p>
                    <button onClick={()=>this.handleLogin()}>Go!</button>
                </p>
             </div>)
              }
          </div> 
      );

  }

      handleLogin() {
            if(this.state.token !== ""){
                this.setState({ loggedIn: true });
                this.playerCheckInterval=setInterval(() => this.checkPlayer(), 1000);
            }
      }

    checkPlayer(){
        const{ token } = this.state;

        if(window.Spotify !== null){
            clearInterval(this.playerCheckInterval);
            this.player=new window.Spotify.Player({
                name: "Keegan's Spotify Player",
                getOAuthToken: cb => {cb(token); },
            });
            this.createEventHandlers();
            this.player.connect();
        }
    }

createEventHandlers() {
  this.player.on('initialization_error', e => { console.error(e); });
  this.player.on('authentication_error', e => {
    console.error(e);
    this.setState({ loggedIn: false });
  });
  this.player.on('account_error', e => { console.error(e); });
  this.player.on('playback_error', e => { console.error(e); });

  this.player.on('player_state_changed', state => this.onStateChanged(state));
  this.player.on('ready', data => {
    let { device_id } = data;
    console.log("Let the music play on!");
    this.setState({ deviceId: device_id });
  });
}

onStateChanged(state) {
  if (state !== null) {
    const {
      current_track: currentTrack,
      position,
      duration,
    } = state.track_window;
    const trackName = currentTrack.name;
    const albumName = currentTrack.album.name;
    const artistName = currentTrack.artists
      .map(artist => artist.name)
      .join(", ");
    const playing = !state.paused;
    this.setState({
      position,
      duration,
      trackName,
      albumName,
      artistName,
      playing
    });
  }
}

onPrevClick(){
    this.player.previousTrack();
}

onPlayClick(){
    this.player.togglePlay();
}

onNextClick(){
    this.player.nextTrack();
}
}

export default App;
