import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadCoursesSuccess(courses) {
  return {type: types.LOAD_COURSES_SUCCESS, courses};
}

export function createCourseSuccess(course) {
  return {type: types.CREATE_COURSE_SUCCESS, course};
}

export function updateCourseSuccess(course) {
  return {type: types.UPDATE_COURSE_SUCCESS, course};  
}

export function deleteCourseSuccess(course) {
  return {type: types.DELETE_COURSE_SUCCESS, course};  
}

/**
 * 
 * 
 * @export
 * @returns
 */
export function loadCourses() {
  return dispatch => {
    dispatch(beginAjaxCall());
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
    dispatch(beginAjaxCall());
    // getState - lets you get the state out of the store directly
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw(error);
      });
  };
}

/**
 * 
 * 
 * @param {any} course
 * @returns
 */
export const deleteCourse = (course) =>  {
  return (dispatch, getState) => {
    dispatch(beginAjaxCall());
    return courseApi
      .deleteCourse(course)
      .then(() => {
          dispatch(deleteCourseSuccess(course));
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw(error);
      });
  };
};
