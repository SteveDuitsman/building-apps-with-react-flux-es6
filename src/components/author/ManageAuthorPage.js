import React, {PropTypes} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorForm from './AuthorForm';
import toastr from 'toastr';

class ManageAuthorPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      author: Object.assign({}, this.props.author),
      errors: {},
      saving: false
    };

    this.updateAuthorsState = this.updateAuthorsState.bind(this);
    this.saveAuthor = this.saveAuthor.bind(this);
  }

  updateAuthorsState(event) {
    const field = event.target.name;
    let author = this.state.author;
    author[field] = event.target.value;
    return this.setState({author: author});
  }

  redirect(message) {
    this.setState({saving: false});
    toastr.success(message);
    this.props.router.push('/authors');
  }

  saveAuthor(event) {
    event.preventDefault();
    this.setState({saving: true});

    this.props.actions
      .saveAuthor(this.state.author)
      .then(() => this.redirect('Author Saved'))
      .catch((error) => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  render() {
    return (
      <AuthorForm author={this.state.author}
                  errors={this.state.errors}
                  onChange={this.updateAuthorsState}
                  onSave={this.saveAuthor}
                  saving={this.state.saving} />
    );
  }
}

ManageAuthorPage.propTypes = {
  author: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

/**
 * mapping helper methods and mapping methods
 */
const getAuthorById = (authors, id) => {
  const author = authors.filter(author => author.id == id);
  if (author.length) 
    return author[0];
  
  return null;
};

const mapStateToProps = (state, ownProps) => {
  const authorId = ownProps.params.id;

  let author = {
    id: '',
    firstName: '',
    lastName: ''
  };

  if (!!authorId && !!author.id == false) {
    author = getAuthorById(state.authors, authorId);
  }

  return {author: author};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage));