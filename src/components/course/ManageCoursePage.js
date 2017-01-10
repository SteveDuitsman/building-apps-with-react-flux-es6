import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions'
import CourseForm from './CourseForm';
import toastr from 'toastr';

/**
 * 
 * 
 * @class ManageCoursePage
 * @extends {React.Component}
 */
class ManageCoursePage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false
    };

    // Bindings
    this.updateCoursesState = this.updateCoursesState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);    
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
      this.setState({course: Object.assign({}, nextProps.course)});
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
    return this.setState({ course: course });
  }

  saveCourse(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.saveCourse(this.state.course)
    .then(() => this.redirect());
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Course Saved');
    this.context.router.push('/courses');    
  }

  render() {
    return (
      <CourseForm course={this.state.course}
                  errors={this.state.errors}
                  allAuthors={this.props.authors}
                  onChange={this.updateCoursesState}
                  onSave={this.saveCourse} 
                  saving={this.state.saving} /> 
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
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

  const authorsFormattedForDropDown = state.authors.map(author => {
    return {
      value: author.id,
      text: `${author.firstName} ${author.lastName}`
    };
  });

  return {
    course: course,
    authors: authorsFormattedForDropDown
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);