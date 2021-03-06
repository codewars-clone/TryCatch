import React, { Component } from 'react';

export default class ImageUpload extends Component {
  render() {
    return (
      <div>
        <div className="field">
          <div className="file is-boxed is-success has-name">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                accept="image/png, image/jpeg, image/gif"
                onChange={this.props.handleImageChange}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Choose a photo</span>
              </span>
              <span className="file-name">{this.props.image.name}</span>
            </label>
          </div>
        </div>
      </div>
    );
  }
}
