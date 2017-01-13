import React, {PropTypes} from 'react';
import toastr from 'toastr';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorListRow from './AuthorListRow';
import Pagination from 'react-js-pagination';

class AuthorList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      authors: []
    };
  }

  render() {
    let authors = this.props.authors.map(author => {
      return (
        <AuthorListRow key={author.id} author={author} />
      );
    });
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {authors}
          </tbody>
        </table>
      </div>
    );
  }
}

AuthorList.propType = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthorList);