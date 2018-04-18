//API documentation https://www.themoviedb.org/settings/api
import React from 'react';
//import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Card, CardImg, CardText, Row, Col, Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import SortRadio from './Components/SortRadio';
import LabelledInput from './Components/LabelledInput';
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
    this.state = {
      newData: [],
      sort: 'Most Popular',
      searchText: ''
    };
    this.handleChange = this.handleChange.bind(this);
    //this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount(){
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=5aba3c395ae37ecf6868b1d015913de3&language=en-US&popularity&certification_country=Ireland&include_adult=false&include_video=false&primary_release_year=2017')
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

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;


    this.setState({
      [name]: value
    });
  }

  // handleClick(event) {
  //   const name = event.target.name;
  //   this.setState(prevState => ({
  //     [name]: !prevState[name]
  //   }));
  // }

  componentWillUnMount(){
  }

  render() {

    let data = this.state.sort === 'Most Popular' ? this.state.newData : [].concat(this.state.newData)
    .sort((a, b) => {
      if(a.popularity < b.popularity) return -1;
      if(a.popularity > b.tpopularity) return 1;
      return 0;
    });

    let url = "http://image.tmdb.org/t/p/w185";
    const homeList = data.map( (nd,i) => {
      //const movieMatch = nd.name.lowerCase().includes(this.state.searchText);
      return <Lists key={i} name={nd.title} image={nd.poster_path ? url + nd.poster_path  : "http://via.placeholder.com/100x150"} description={nd.overview} popularity={nd.popularity}/>;
    });
    return (
      <section className="section">
        <SortRadio handleChange={this.handleChange} checked={this.state.sort}/>
        <LabelledInput name="searchText" label="Search by name" value={this.state.searchText} handleChange={this.handleChange} placeholder={"e.g. Avengers"}/>
      <Row>
        {homeList}
      </Row>
    </section>
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
