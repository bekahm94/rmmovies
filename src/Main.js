import React, { Component } from "react";
import { Jumbotron } from 'react-bootstrap';
import { Route, NavLink, HashRouter } from "react-router-dom";
import Home from "./Home";
import Movie from "./Movie";
import TVShows from "./TVShows";
import Marvel from "./Marvel";
import Family from "./Family";

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
        <Jumbotron fluid className="jumbotronHeader">
         <container fluid>
          <h1 className="display-3">RM Movies</h1>
         </container>
        </Jumbotron>

            <ul className="header">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/movie">Movies</NavLink></li>
              <li><NavLink to="/tvshows">TV Shows</NavLink></li>
              <li><NavLink to="/marvel">Marvel</NavLink></li>
              <li><NavLink to="/family">Family</NavLink></li>
            </ul>

          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/movie" component={Movie}/>
            <Route path="/tvshows" component={TVShows}/>
            <Route path= "/marvel" component={Marvel}/>
            <Route path="/family" component={Family}/>
          </div>
            <ul className="footer-left">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/movie">Movies</NavLink></li>
              <li><NavLink to="/tvshows">TV Shows</NavLink></li>
              <li><NavLink to="/marvel">Marvel</NavLink></li>
              <li><NavLink to="/family">Family</NavLink></li>
            </ul>
        </div>
      </HashRouter>
    );
  }
}

export default Main;
