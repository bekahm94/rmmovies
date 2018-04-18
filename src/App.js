// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
//
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }
//
// export default App;


//API documentation https://www.themoviedb.org/settings/api

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link} from 'react-router-dom';

//declaring API
//const key = '5aba3c395ae37ecf6868b1d015913de3';
//const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWJhM2MzOTVhZTM3ZWNmNjg2OGIxZDAxNTkxM2RlMyIsInN1YiI6IjVhYTkwNzY5MGUwYTI2M2RkMzAzNjdmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gp_TRImPQWMhPQ1BU4zUePIWtc5wjAyPhJAeA4WFLKI';
//const url = 'https://api.themoviedb.org/3/list/1?api_key=5aba3c395ae37ecf6868b1d015913de3&language=en-US';
//const url = 'https://api.themoviedb.org/4/movie/550?api_key=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWJhM2MzOTVhZTM3ZWNmNjg2OGIxZDAxNTkxM2RlMyIsInN1YiI6IjVhYTkwNzY5MGUwYTI2M2RkMzAzNjdmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gp_TRImPQWMhPQ1BU4zUePIWtc5wjAyPhJAeA4WFLKI';

class App extends React.Component {
  constructor(){
    super();
    this.state = {movieData: []};
  }

  componentWillMount(){
    fetch('https://api.themoviedb.org/3/list/1?api_key=5aba3c395ae37ecf6868b1d015913de3&language=en-US')
    //fetch('https://api.themoviedb.org/3/discover/movie?api_key=5aba3c395ae37ecf6868b1d015913de3&sort_by=popluarity.desc')
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {
      this.setState( {movieData: data.items } );
      console.log(data.items);
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    let url = "http://image.tmdb.org/t/p/w185";
    const formattedMovies = this.state.movieData.map( (m,i) => {
      return <List key={i} name={m.title} image={url + m.poster_path} description={m.overview}/>;
    });
    return (
      <div>
        {formattedMovies}
      </div>
    );
    }
  }

  class List extends React.Component {
    render(){
      return (
        <div>
          <p>{this.props.name}</p>
          <img src={this.props.image} alt='' />
          <p>{this.props.description}</p>
          </div>
      );
    }
  }

  ReactDOM.render(
    <App />, document.getElementById('root')
  );

  export default App;
