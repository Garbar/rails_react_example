'use strict';

var Spinner = React.createClass({
  render: function() {
    return (
      <div className="row spinner">
          <div className="col-md-12 .m-t-xl">
              <h1 className="logo-name text-center">...Wait...</h1>
          </div>
      </div>
    );
  }
})
module.exports = Spinner;
