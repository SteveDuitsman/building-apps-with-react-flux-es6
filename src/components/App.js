import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header loading={this.props.loading} numberOfCourses={this.props.numberOfCourses} />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  numberOfCourses: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.ajaxCallsInProgress > 0,
    numberOfCourses: state.courses.length
  };
};

export default connect(mapStateToProps)(App);