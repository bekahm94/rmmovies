
//API documentation https://www.themoviedb.org/settings/api
import React from 'react';
//import ReactDOM from 'react-dom';
import { Card, CardImg, CardText, Row, Col, Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
//import {BrowserRouter, Route, NavLink} from 'react-router-dom';

//declaring API
//const key = '5aba3c395ae37ecf6868b1d015913de3';
//const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWJhM2MzOTVhZTM3ZWNmNjg2OGIxZDAxNTkxM2RlMyIsInN1YiI6IjVhYTkwNzY5MGUwYTI2M2RkMzAzNjdmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gp_TRImPQWMhPQ1BU4zUePIWtc5wjAyPhJAeA4WFLKI';
//const url = 'https://api.themoviedb.org/3/list/1?api_key=5aba3c395ae37ecf6868b1d015913de3&language=en-US';
//const url = 'https://api.themoviedb.org/4/movie/550?api_key=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWJhM2MzOTVhZTM3ZWNmNjg2OGIxZDAxNTkxM2RlMyIsInN1YiI6IjVhYTkwNzY5MGUwYTI2M2RkMzAzNjdmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gp_TRImPQWMhPQ1BU4zUePIWtc5wjAyPhJAeA4WFLKI';

class Family extends React.Component {
  constructor(){
    super();
    this.state = {famData: []};
  }

  componentWillMount(){
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=5aba3c395ae37ecf6868b1d015913de3&language=en-US&&with_genres=10751&primary_release_year=2018')
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {
      this.setState( {famData: data.results } );
      console.log(data.results);
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    let url = "http://image.tmdb.org/t/p/w185";
    const formattedFamily = this.state.famData.map( (f,i) => {
      return <Fam key={i} name={f.title} image={f.poster_path ? url + f.poster_path  : "http://via.placeholder.com/100x150"} description={f.overview} popularity={f.popularity}/>;
    });
    return (
      <Row>
        {formattedFamily}
      </Row>
    );
    }
  }

  class Fam extends React.Component {
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
              <Button color="danger" onClick={this.toggle}>Description</Button>
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

  export default Family;
