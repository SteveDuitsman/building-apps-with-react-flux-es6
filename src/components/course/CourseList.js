import React, {PropTypes} from 'react';
import toastr from 'toastr';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseListRow from './CourseListRow';

class CourseList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      courses: [],
      deleting: false
    };

    // Bindings
    this.deleteCourse = this
      .deleteCourse
      .bind(this);
  }

  deleteCourse(event, course) {
      if (confirm(`Are you sure you want to delete "${course.title}"?`)) {
        this.setState({deleting: true});
        this
          .props
          .actions
          .deleteCourse(course)
          .then(() => {
            toastr.success('Courses Deleted');
            this.setState({deleting: false});
          })
          .catch(error => {
            toastr.error(error);
            this.setState({deleting: false});            
          });
      }
    }

  render() {
    let courses = this.props.courses.map(course => {
      return (
        <CourseListRow key={course.id} course={course} onDelete={this.deleteCourse} deleting={this.state.deleting} />
      );
    });
    return (
      <table className="table">
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Length</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {courses}
        </tbody>
      </table>
    );
  }
}

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    courses: state.courses
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);