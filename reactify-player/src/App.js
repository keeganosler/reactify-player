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
                <h2>Currently Playing..</h2>
                <p>Spotify Web Player by Keegan</p>
             </div>
             {error && <p>Error: {error}</p>}
             {loggedIn ?
              (<div>
                <p>Artist: {artistName}</p>
                <p>Song: {trackName}</p>
                <p>Album: {albumName}</p>
              </div>)
              :
              (<div>
                <p className="App-intro">
                    Enter your Spotify access token. Get it from{" "}<a href="https://beta.developer.spotify.com/documentation/web-playback-sdk/quick-start/#authenticating-with-spotify">here</a>.
                </p>
`               <p>
                    <input type="text" value={token} onChange={e => this.setState({ token: e.target.value })} />
                </p>
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
            }
      }
}

export default App;
