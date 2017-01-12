import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import {authorsFormattedForDropDown} from '../../selectors/selectors.js';
import CourseForm from './CourseForm';
import toastr from 'toastr';

/**
 *
 *
 * @class ManageCoursePage
 * @extends {React.Component}
 */
export class ManageCoursePage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false,
      deleting: false
    };

    // Bindings
    this.updateCoursesState = this
      .updateCoursesState
      .bind(this);
    this.saveCourse = this
      .saveCourse
      .bind(this);
    this.deleteCourse = this
      .deleteCourse
      .bind(this);
  }

  /**
   *
   *
   * @param {any} nextProps
   *
   * @memberOf ManageCoursePage
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.course.id != nextProps.course.id) {
      // necessary to populate form when existing course is loaded directly
      this.setState({
        course: Object.assign({}, nextProps.course)
      });
    }
  }

  /**
   *
   *
   * @param {any} event
   * @returns
   *
   * @memberOf ManageCoursePage
   */
  updateCoursesState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();

    if (!this.courseFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    this
      .props
      .actions
      .saveCourse(this.state.course)
      .then(() => this.redirect('Course Saved'))
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  deleteCourse(event) {
    event.preventDefault();
    if (!this.props.isNew) {
      if (confirm(`Are you sure you want to delete "${this.state.course.title}"?`)) {
        this.setState({deleting: true});
        this
          .props
          .actions
          .deleteCourse(this.state.course)
          .then(() => this.redirect('Course Deleted'))
          .catch(error => {
            toastr.error(error);
            this.setState({deleting: false});
          });
      }
    }
  }

  redirect(message) {
    this.setState({saving: false, deleting: false});
    toastr.success(message);
    this
      .context
      .router
      .push('/courses');
  }

  render() {
    return (<CourseForm
      course={this.state.course}
      errors={this.state.errors}
      allAuthors={this.props.authors}
      onChange={this.updateCoursesState}
      onSave={this.saveCourse}
      saving={this.state.saving}
      isNew={this.props.isNew}/>);
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  isNew: PropTypes.bool.isRequired
};

// Pull in the React Router context so router is available on this context.route
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

/**
 *
 *
 * @param {any} courses
 * @param {any} id
 * @returns
 */
const getCourseById = (courses, id) => {
  const course = courses.filter(course => course.id == id);
  if (course.length) 
    return course[0];
  
  return null;
};

const mapStateToProps = (state, ownProps) => {
  const courseId = ownProps.params.id; // from the path '/course/:id'

  let course = {
    id: '',
    watchHref: '',
    title: '',
    authorId: '',
    length: '',
    category: ''
  };

  if (!!courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  return {
    course: course,
    isNew: (!!course && !!course.id == false),
    authors: authorsFormattedForDropDown(state.authors)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);