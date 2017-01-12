import React, {PropTypes} from 'react';
import {Link} from 'react-router';

/* eslint-disable react/jsx-no-bind */
// onDelete is not passed into any results under this, so we can use the () => {} syntax within the jsx
const CourseListRow = ({course, onDelete}) => {
  return (
    <tr>
      <td><a href={course.watchHref} target="_blank">Watch</a></td>
      <td><Link to={'/course/' + course.id}>{course.title}</Link></td>
      <td>{course.authorId}</td>
      <td>{course.category}</td>
      <td>{course.length}</td>
      <td>
        <button 
          type="button"
          className="btn btn-danger"
          onClick={(e) => onDelete(e, course)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

CourseListRow.propTypes = {
  course: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default CourseListRow;