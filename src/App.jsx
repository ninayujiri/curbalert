import React, { Component } from "react";
<<<<<<< HEAD
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';
import Geocode from 'react-geocode';
import './styles/scss/App.css';
=======
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import "./styles/scss/NavBar.css";
import "./styles/scss/App.css";
import "./styles/scss/Map.css";
import "./styles/scss/Home.css";
import "./styles/scss/SideBar.css";
>>>>>>> 48d4c8c339a16c766671fdc8da71446183fb02b9
import Home from "./Home.jsx";
import NavBar from "./NavBar.jsx";
import SideBar from "./SideBar.jsx";
import PostList from "./PostList.jsx";
import NewPost from "./NewPost.jsx";
import MapContainer from "./MapContainer.jsx";
import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";
import PostModal from "./PostModal.jsx";
import AuthService from "./AuthService.jsx";
require("dotenv").config();

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
      modalParams: {}
		};
    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
	}

<<<<<<< HEAD
  constructor(props) {
    super(props);
  	this.state = {
  		posts: [],
      center: {lat: 0, lng: 0},
      zoom: 11
      };
  	}
=======
  getUser = () => {
    let currentEmail = this.Auth.getEmail("email");
    axios.get("http://localhost:3001/users").then(response => {
      let usersArr = response.data;
      usersArr.forEach(user => {
        if (user.email == currentEmail) {
          this.setState({
            currentUser: user,
            center: { lat: user.geo_tag.x, lng: user.geo_tag.y }
          });
        }
      });
    });
  }
>>>>>>> 48d4c8c339a16c766671fdc8da71446183fb02b9

	componentDidMount() {
    console.log('did mount');
		this.getUser();
	}

	createPostList = () => {
		let that = this;
		let postsArr = [];
		axios
			.get("http://localhost:3001/api/posts")
			.then(response => {
				postsArr = response.data;
				this.setState({ posts: [...that.state.posts, ...postsArr] });
			})
			.catch(error => {
				console.log(error);
			});
	};

  showModal(params) {
    console.log(params);
    this.setState({modalVisible: true, modalParams: params})
  }

<<<<<<< HEAD
  createPostList = () => {
    let postsArr = [];
    axios.get('http://localhost:3001/api/posts')
    .then(response => {
      postsArr = response.data;
      this.setState({ posts: [...this.state.posts, ...postsArr] })
    })
    .catch(error => {
      console.log(error);
    });
=======
  closeModal() {
    this.setState({modalVisible: false, modalParams: {}})
>>>>>>> 48d4c8c339a16c766671fdc8da71446183fb02b9
  }
	addPost = (post) => {
		this.setState({ posts: [...this.state.posts, post] })
	}

  render() {
    let postmodal;
    postmodal = (this.state.modalVisible) ? <PostModal modalParams={this.state.modalParams} posts={this.state.posts} closeModal={this.closeModal} /> : '';

    return (
			<div className="App">
				<NavBar username={this.state.currentUser.username} />
				<Switch>
          <Route
            exact path='/login'
            render={() => (
              <LoginForm
                getUser={this.getUser}
              />
            )}
          />

<<<<<<< HEAD
					<Route path='/posts/new' render={() => (
						<NewPost trashUploadHandler={this.trashUploadHandler} addPost={this.addPost} />
					)}/>
=======
					<Route exact path="/register" component={RegisterForm} />
					<Route
						exact path="/upload"
						render={() => (
							<NewPost
								trashUploadHandler={this.trashUploadHandler}
								addPost={this.addPost}
							/>
						)}
					/>
>>>>>>> 48d4c8c339a16c766671fdc8da71446183fb02b9

					<Route
						exact path="/" render={() => (
							<div className="home">
								<Home posts={this.state.posts} createPostList={this.createPostList}/>
								<div className="map" style={{ width: "100%", height: "600px" }}>
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
						)}
					/>

					<Route
						exact
						path="/posts"
						render={() => (
							<PostList
								posts={this.state.posts}
								createPostList={this.createPostList}
							/>
						)}
					/>
				</Switch>
			</div>
		);
	}
}

export default App;
