import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';

export function loadCoursesSuccess(courses) {
  return {type: types.LOAD_COURSES_SUCCESS, courses};
}

export function createCourseSuccess(course) {
  return {type: types.CREATE_COURSE_SUCCESS, course};
}

export function updateCourseSuccess(course) {
  return {type: types.UPDATE_COURSE_SUCCESS, course};  
}

/**
 * 
 * 
 * @export
 * @returns
 */
export function loadCourses() {
  return dispatch => {
    return courseApi
      .getAllCourses()
      .then(courses => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch(error => {
        throw(error);
      });
  };
}

/**
 * 
 * 
 * @export
 * @param {any} course
 * @returns
 */
export function saveCourse(course) {
  return (dispatch, getState) => {
    // getState - lets you get the state out of the store directly
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        // "Merge" the course
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch(error => {
        throw(error);
      });
  };
}