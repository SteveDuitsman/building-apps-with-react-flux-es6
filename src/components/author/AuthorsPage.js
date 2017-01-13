import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorList from './AuthorList';
import { browserHistory } from 'react-router';

class AuthorsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    
    this.state = {
        author: {}
    };
  }
  
  redirectToAddAuthorPage() {
    browserHistory.push('/author');
  }

  render() {
    const {authors} = this.props;
    return (
      <div>
        <h1>Authors</h1>
        <button className="btn btn-primary" 
                onClick={this.redirectToAddAuthorPage}>
          Add Author
        </button>
        {authors && authors.length > 0 && <AuthorList authors={authors} />}
      </div>
    );
  }
}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    authors: state.authors
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);