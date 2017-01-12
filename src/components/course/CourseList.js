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
    this.deleteCourse = this.deleteCourse.bind(this);
    this.onColumnClick = this.onColumnClick.bind(this);
    this.sorter = this.sorter.bind(this);
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

    /**
     * generic sorter function that takes into account how we are sorting
     * 
     * @param {any} a
     * @param {any} b
     * @returns
     * 
     * @memberOf CourseList
     */
    sorter(a, b) {
      if (!this.state.sort) {
        return 0;
      }

      let sortingColumn = this.state.sort.toLowerCase();
      if (a[sortingColumn] < b[sortingColumn]) {
        return -1;
      }
      if (a[sortingColumn] > b[sortingColumn]) {
        return 1;
      }
      return 0;
    }

  /**
   * on column click, change the sorting of the table
   * 
   * @param {any} event
   * 
   * @memberOf CourseList
   */
  onColumnClick(event) {
    let column = event.currentTarget.innerText;
    this.setState({sort: column});
  }

  render() {
    let courses = this.props.courses.sort(this.sorter).map(course => {
      return (
      <CourseListRow key={course.id} course={course} onDelete={this.deleteCourse} deleting={this.state.deleting} />
      );
    });
    return (
      <table className="table">
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th onClick={this.onColumnClick}>Title</th>
            <th onClick={this.onColumnClick}>Author</th>
            <th onClick={this.onColumnClick}>Category</th>
            <th onClick={this.onColumnClick}>Length</th>
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