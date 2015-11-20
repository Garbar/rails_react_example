'use strict';

var ObjectsList = React.createClass({

  render: function() {
    return (
      <div className="row">
        <h2>Objects</h2>
        <div className="media">
          <a className="pull-left" href="#">
            <img alt="Media Object" className="media-object" src="http://placehold.it/64x64" />
          </a>
          <div className="media-body">
            <h4 className="media-heading">Media heading</h4>
            This is some sample text. This is some sample text.This is some sample text.
            This is some sample text.This is some sample text. This is some sample text.
            This is some sample text. This is some sample text.
          </div>
        </div>
        <div className="media">
          <a className="pull-left" href="#">
            <img alt="Media Object" className="media-object" src="http://placehold.it/64x64" />
          </a>
          <div className="media-body">
            <h4 className="media-heading">Media heading</h4>
            This is some sample text. This is some sample text.This is some sample text.
            This is some sample text.This is some sample text. This is some sample text.
            This is some sample text. This is some sample text.
          </div>
        </div>
      </div>

    );
  }
});

module.exports = ObjectsList;
