
//API documentation https://www.themoviedb.org/settings/api
import React from 'react';
//import ReactDOM from 'react-dom';
import { Card, CardImg, CardText, Row, Col, Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
//import {BrowserRouter, Route, NavLink} from 'react-router-dom';
import LabelledInput from './Components/LabelledInput';
import TVShows from './TVShows';
//declaring API
//const key = '5aba3c395ae37ecf6868b1d015913de3';
//const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWJhM2MzOTVhZTM3ZWNmNjg2OGIxZDAxNTkxM2RlMyIsInN1YiI6IjVhYTkwNzY5MGUwYTI2M2RkMzAzNjdmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gp_TRImPQWMhPQ1BU4zUePIWtc5wjAyPhJAeA4WFLKI';
//const url = 'https://api.themoviedb.org/3/list/1?api_key=5aba3c395ae37ecf6868b1d015913de3&language=en-US';
//const url = 'https://api.themoviedb.org/4/movie/550?api_key=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWJhM2MzOTVhZTM3ZWNmNjg2OGIxZDAxNTkxM2RlMyIsInN1YiI6IjVhYTkwNzY5MGUwYTI2M2RkMzAzNjdmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gp_TRImPQWMhPQ1BU4zUePIWtc5wjAyPhJAeA4WFLKI';

class TVShowSearch extends React.Component {
  constructor(){
    super();
    this.state = {
      tvData: [],
      searchText: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount(){
    fetch('https://api.themoviedb.org/3/discover/tv?api_key=5aba3c395ae37ecf6868b1d015913de3&language=en-US&primary_release_year=2018')
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {
      this.setState( {tvData: data.results } );
      console.log(data.results);
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  render() {
    let url = "http://image.tmdb.org/t/p/w185";
    let placeurl = "http://via.placeholder.com/100x150";
    let showList = this.state.tvData
    .filter (
      tv =>
      this.state.searchText === " " ? true : tv.name.toLowerCase().includes(this.state.searchText)
    )
    const formattedShows = this.state.tvData.map((tv,i) => {
      return <Show key={i} name={tv.name} image={tv.poster_path ? url + tv.poster_path  : placeurl} description={tv.overview} popularity={tv.popularity}/>
    });

    return (
      <div>
        <div className="search-header">
          <LabelledInput name="searchText" label="Search by name" vlaue={this.state.searchText} handleChange={this.handleChange} placeholder={"e.g. big bang theory"} />
        </div>
        <Row className="shows">
          {showList}
        </Row>
      </div>
    );
    }
  }

  class Show extends React.Component {

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
                <ModalBody src={this.props.image}></ModalBody>
                <ModalBody>{this.props.description}</ModalBody>
              </Modal>
              <CardText>{this.props.popularity}</CardText>
            </Card>
          </Col>
      );
    }
  }

  export default TVShowSearch;
