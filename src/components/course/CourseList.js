import React, {PropTypes} from 'react';
import toastr from 'toastr';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseListRow from './CourseListRow';
import Pagination from 'react-js-pagination';

class CourseList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      courses: [],
      deleting: false,
      sort: 'Title',
      sortDirection: 'ascending',
      activePage: 1,
      itemsPerPage: 2
    };

    // Bindings
    this.deleteCourse = this.deleteCourse.bind(this);
    this.onColumnClick = this.onColumnClick.bind(this);
    this.sorter = this.sorter.bind(this);
    this.getHeaderClass = this.getHeaderClass.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
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

      let sortResult = 0;
      let sortingColumn = this.state.sort.toLowerCase();
      if (a[sortingColumn] < b[sortingColumn]) {
        sortResult = -1;
      }
      if (a[sortingColumn] > b[sortingColumn]) {
        sortResult = 1;
      }

      if (this.state.sortDirection === 'descending') {
        sortResult *= -1;
      }

      return sortResult;
    }

  /**
   * on column click, change the sorting of the table
   * 
   * @param {any} event
   * 
   * @memberOf CourseList
   */
  onColumnClick(event) {
    let column = event.currentTarget.textContent;
    let sortDirection = 'ascending';
    
    if (column === this.state.sort && sortDirection === this.state.sortDirection) {
      sortDirection = 'descending';
    }

    this.setState({sort: column, sortDirection: sortDirection});
  }

  getHeaderClass(headerText) {
    let classValue = '';
    if (headerText.toLowerCase() === this.state.sort.toLowerCase()) {
      classValue = 'arrow-down';
      if (this.state.sortDirection === 'descending') {
        classValue = 'arrow-up';
      }
    }
    return classValue;
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
  }

  render() {
    let sortedCourses = this.props.courses.sort(this.sorter);
    let startIndex = (this.state.activePage - 1) * this.state.itemsPerPage;
    let endIndex = startIndex + this.state.itemsPerPage;
    let courses = sortedCourses
      .slice(startIndex, endIndex)
      .map(course => {
        return (
        <CourseListRow key={course.id} course={course} onDelete={this.deleteCourse} deleting={this.state.deleting} />
        );
      });

    return (
      <div>      
        <table className="table">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th onClick={this.onColumnClick}>Title<div className={`pull-right ${this.getHeaderClass('Title')}`}></div></th>
              <th onClick={this.onColumnClick}>Author<div className={`pull-right ${this.getHeaderClass('Author')}`}></div></th>
              <th onClick={this.onColumnClick}>Category<div className={`pull-right ${this.getHeaderClass('Category')}`}></div></th>
              <th onClick={this.onColumnClick}>Length<div className={`pull-right ${this.getHeaderClass('Length')}`}></div></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {courses}
          </tbody>
        </table>
        <div className="text-center">
          <Pagination
            activePage={this.state.activePage} 
            itemsCountPerPage={this.state.itemsPerPage} 
            totalItemsCount={this.props.courses.length} 
            onChange={this.handlePageChange}
          />
        </div>
      </div>      
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