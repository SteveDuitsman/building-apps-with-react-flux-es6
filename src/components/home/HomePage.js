import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Pluralsight Administration</h1>
        <h3>
          <Link to="/courses" className="">Courses</Link>
        </h3>
        <h3>
          <Link to="/authors" className="">Authors</Link>
        </h3>
      </div>
    );
  }
}

export default HomePage;