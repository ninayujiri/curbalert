import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import './styles/scss/NavBar.css';
import './styles/scss/App.css';
import './styles/scss/Map.css';
import './styles/scss/Home.css';
import './styles/scss/SideBar.css';
import './styles/scss/Login.css';
import './styles/scss/NewPost.css';
import Home from './Home.jsx';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import SideBar from './SideBar.jsx';
import PostList from './PostList.jsx';
import NewPost from './NewPost.jsx';
import MapContainer from './MapContainer.jsx';
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';
import PostModal from './PostModal.jsx';
import LandingPage from './LandingPage.jsx';
import AuthService from './AuthService.jsx';
import Profile from './Profile.jsx';
import Geocode from 'react-geocode';
require('dotenv').config();

class App extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      posts: [],
      center: { lat: 45.5, lng: -73.57 }, // defaults to dt mtl
      zoom: 11,
      currentUser: {},
      modalVisible: false,
      modalParams: {},
      addPostModalVisable: false,
    };
  }

  componentDidMount() {
    this.getUser();
  }

  filterPosts = foundPosts => {
    this.setState({ posts: foundPosts });
  };

  getUser = () => {
    let currentEmail = this.Auth.getEmail('email');
    axios.get('http://localhost:3001/users').then(response => {
      let usersArr = response.data;
      usersArr.forEach(user => {
        if (user.email == currentEmail) {
          this.setState({
            currentUser: user,
            center: { lat: user.geo_tag.x, lng: user.geo_tag.y },
          });
        }
      });
    });
  };

  createPostList = () => {
    let postsArr = [];
    axios
      .get('http://localhost:3001/api/posts')
      .then(response => {
        postsArr = response.data.reverse();
        postsArr.forEach(post => {
          Geocode.fromLatLng(post.geo_tag.x, post.geo_tag.y).then(response => {
            const address = response.results[0].formatted_address;
            let addressPost = { ...post, address };
            this.setState({
              posts: [addressPost, ...this.state.posts],
            });
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  clearSearchForm = form => {
    form.reset();
  };

  resetPosts = () => {
    let postsArr = [];
    axios
      .get('http://localhost:3001/api/posts')
      .then(response => {
        postsArr = response.data;
        this.setState({ posts: postsArr });
      })
      .catch(error => {
        console.log(error);
      });
  };

  showAddPostModal = () => {
    this.setState({ addPostModalVisable: true });
  };
  closeAddPostModal = () => {
    this.setState({ addPostModalVisable: false });
  };

  addPost = post => {
    this.setState({ posts: [post, ...this.state.posts] });
  };

  showModal = params => {
    this.setState({ modalVisible: true, modalParams: params });
  };

  closeModal = () => {
    this.setState({ modalVisible: false, modalParams: {} });
  };

  render() {
    let addPostModal = null;
    addPostModal = this.state.addPostModalVisable ? (
      <NewPost
        trashUploadHandler={this.trashUploadHandler}
        addPost={this.addPost}
        currentUser={this.state.currentUser}
        closeAddPostModal={this.closeAddPostModal}
      />
    ) : (
      ''
    );

    let postmodal;
    postmodal = this.state.modalVisible ? (
      <PostModal
        modalParams={this.state.modalParams}
        posts={this.state.posts}
        closeModal={this.closeModal}
      />
    ) : (
      ''
    );

    return (
      <div className="App">
        {addPostModal}
        <NavBar
          username={this.state.currentUser.username}
          showAddPostModal={this.showAddPostModal}
        />
        <Switch>
          <Route exact path="/welcome" render={() => <LandingPage />} />

          <Route exact path="/login" render={() => <LoginForm getUser={this.getUser} />} />

          <Route exact path="/register" component={RegisterForm} />
          <Route
            exact
            path="/posts/new"
            render={() =>
              this.Auth.loggedIn() ? (
                <NewPost
                  trashUploadHandler={this.trashUploadHandler}
                  addPost={this.addPost}
                  currentUser={this.state.currentUser}
                />
              ) : (
                <Redirect to="/welcome" />
              )
            }
          />

          <Route
            exact
            path="/"
            render={() =>
              this.Auth.loggedIn() ? (
                <div className="home">
                  <Home
                    posts={this.state.posts}
                    createPostList={this.createPostList}
                    filterPosts={this.filterPosts}
                    resetPosts={this.resetPosts}
                  />
                  <div className="map">
                    {postmodal}
                    <MapContainer
                      center={this.state.center}
                      zoom={this.state.zoom}
                      posts={this.state.posts}
                      createPostList={this.createPostList}
                      showModal={this.showModal}
                    />
                  </div>
                </div>
              ) : (
                <Redirect to="/welcome" />
              )
            }
          />

          <Route
            exact
            path="/posts"
            render={() =>
              this.Auth.loggedIn() ? (
                <PostList
                  posts={this.state.posts}
                  createPostList={this.createPostList}
                  filterPosts={this.filterPosts}
                  resetPosts={this.resetPosts}
                />
              ) : (
                <Redirect to="/welcome" />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
