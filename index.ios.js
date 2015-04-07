/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} = React;

var butwhen = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Player />
      </View>
    );
  }
});

var Player = React.createClass({
  getInitialState: function() {
    return {
      year: 1920,
      href: '',
      albumArt: 'http://placehold.it/380x380',
      playing: false
    };
  },
  fetchNewSong: function() {
    var year = Math.round(1920 + 95 * Math.random());

    fetch('https://api.spotify.com/v1/search?q=year:' + year + '&type=track')
      .then((response) => response.json())
      .then((responseData) => {
        var track = responseData.tracks.items[Math.round(10 * Math.random())];
        var image = track.album.images[1];
        
        this.setState({
          year: year,
          href: track.href,
          albumArt: image.url
        });
      })
      .done();
  },
  componentDidMount: function() {
    this.fetchNewSong();
  },
  render: function() {
    return (
      <View style={styles.player}>
        <Image style={playerStyles.albumArt} source={{uri: this.state.albumArt}}>
          <Text style={playerStyles.text}>Player</Text>
          <Controls />
        </Image>
      </View>
    );
  }
});

var Controls = React.createClass({
  render: function() {
    return (
      <Text style={playerStyles.text}>Play</Text>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

var playerStyles = StyleSheet.create({
  text: {
    backgroundColor: 'transparent'
  },
  albumArt: {
    width: 380,
    height: 380
  }
});

AppRegistry.registerComponent('butwhen', () => butwhen);
