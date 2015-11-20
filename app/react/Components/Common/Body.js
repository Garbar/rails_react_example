'use strict';
import TopMenu        from './TopMenu';

var Body = React.createClass({
  render: function() {
    return(<div id="wrapper">
        <TopMenu />
        <div className="container-full">
          {this.props.children}
        </div>
      </div>
    );
  }
});
module.exports = Body;
