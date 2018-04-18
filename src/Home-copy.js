//API documentation https://www.themoviedb.org/settings/api
import React from 'react';
//import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Card, CardImg, CardText, Row, Col, Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
// import { Card, CardTitle, CardText } from 'reactstrap'
//import {BrowserRouter, Route, NavLink} from 'react-router-dom';

//declaring API
//const key = '5aba3c395ae37ecf6868b1d015913de3';
//const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWJhM2MzOTVhZTM3ZWNmNjg2OGIxZDAxNTkxM2RlMyIsInN1YiI6IjVhYTkwNzY5MGUwYTI2M2RkMzAzNjdmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gp_TRImPQWMhPQ1BU4zUePIWtc5wjAyPhJAeA4WFLKI';
//const url = 'https://api.themoviedb.org/3/list/1?api_key=5aba3c395ae37ecf6868b1d015913de3&language=en-US';
//const url = 'https://api.themoviedb.org/4/movie/550?api_key=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWJhM2MzOTVhZTM3ZWNmNjg2OGIxZDAxNTkxM2RlMyIsInN1YiI6IjVhYTkwNzY5MGUwYTI2M2RkMzAzNjdmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gp_TRImPQWMhPQ1BU4zUePIWtc5wjAyPhJAeA4WFLKI';
class Home extends React.Component {
  constructor(){
    super();
    this.state = {newData: []};
  }

  componentWillMount(){
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=5aba3c395ae37ecf6868b1d015913de3&language=en-US&sort_by=popularity.desc&certification_country=Ireland&include_adult=false&include_video=false&primary_release_year=2017')
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {
      this.setState( {newData: data.results } );
      console.log(data.results);
    })
    .catch(error => {
      console.log(error);
    });
  }

  componentWillUnMount(){
  }

  render() {
    let url = "http://image.tmdb.org/t/p/w185";
    const formattedMovies = this.state.newData.map( (nd,i) => {
      return <Lists key={i} name={nd.title} image={nd.poster_path ? url + nd.poster_path  : "http://via.placeholder.com/100x150"} description={nd.overview} popularity={nd.popularity}/>;
    });
    return (
      <Row>
        {formattedMovies}
      </Row>
    );
    }
  }

  class Lists extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modal: false
      };

      this.toggle = this.toggle.bind(this);
    }

    toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }

    render(){
      return (
        <Col sm="3" xs="0">
            <Card body>
              <CardImg src={this.props.image} alt="Card image cap" />
            </Card>
            <Card body>
              <Button color="danger" className="modalButton" onClick={this.toggle}>Description</Button>
              <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>{this.props.name}</ModalHeader>
                <ModalBody>{this.props.description}</ModalBody>
              </Modal>
              <CardText>{this.props.popularity}</CardText>
            </Card>
          </Col>
      );
    }
  }

// Checks that the correct type of props are supplied


export default Home;
