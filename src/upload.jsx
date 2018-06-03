import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';

const vision = require('node-cloud-vision-api');
vision.init({ auth: 'AIzaSyAnrjzdyVfMk1uUpLopu1hRzggD7L0LQsM' });

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trashPicUrl: null,
      trashTags: null,
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/')
      .then(function(response) {
        console.log(response.data);
        //set state for trash posts
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleDrop = files => {
    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', `codeinfuse, medium, gist`);
      formData.append('upload_preset', 'iyxcz7xd');
      formData.append('api_key', '335537953636657');
      formData.append('timestamp', (Date.now() / 1000) | 0);

      // Make an upload request to cloudinary
      return axios
        .post('https://api.cloudinary.com/v1_1/trasher/image/upload/', formData, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
        })
        .then(response => {
          const data = response.data;
          const fileURL = data.secure_url; //URL for future references
          const url = data.url;

          this.setState({ trashPicUrl: data.url });

          console.log(data.url);
          // VISION part - takes url and responds with labes
          const req = new vision.Request({
            image: new vision.Image({
              url: url,
            }),
            features: [new vision.Feature('LABEL_DETECTION', 10)],
          });

          vision.annotate(req).then(
            res => {
              // handling response from VISION
              if (res.responses[0].labelAnnotations) {
                let tags = res.responses[0].labelAnnotations.map(ann => {
                  return ann.description;
                });
                this.setState({
                  trashTags: tags,
                });
              }
            },
            e => {
              console.log('Error: ', e);
            },
          );
        });
    });

    // Once all the files are uploaded
    axios.all(uploaders).then(() => {
      console.log('hello');
    });
  };

  render() {
    let { trashPicUrl, trashTags } = this.state;
    let trashPic = null;
    let tags = null;

    if (trashPicUrl) {
      trashPic = <img src={trashPicUrl} />;
    } else {
      trashPic = <h1>hello World</h1>;
    }

    if (trashTags) {
      tags = trashTags.map(tag => {
        return <span className="tag">{tag}</span>;
      });
    }

    return (
      <div>
        <Dropzone onDrop={this.handleDrop} multiple accept="image/*">
          <p>Drop your files or click here to upload</p>
        </Dropzone>
        {trashPic}
        {tags}
      </div>
    );
  }
}
export default Upload;