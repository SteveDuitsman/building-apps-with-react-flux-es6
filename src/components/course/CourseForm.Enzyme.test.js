import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';

// Could not use fat arrow syntax for this...why?
function setup(saving, deleting) {
  const props = {
    course: {},
    saving: saving,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  return shallow(<CourseForm {...props}/>);
}

describe('CourseForm via Enzyme', () => {
  it('renders form and h1', () => {
    const wrapper = setup(false, false);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Manage Course');
  });

  it('Save button is labeled "Save" when not saving', () => {
    const wrapper = setup(false, false);
    expect(wrapper.find('input').props().value).toBe('Save');
  });

  it('Save button is labeled "Saving..." when saving', () => {
    const wrapper = setup(true, false);
    expect(wrapper.find('input').props().value).toBe('Saving...');
  });

  // it('Delete button is labeled "Delete" when not saving', () => {
  //   const wrapper = setup(false, false);
  //   expect(wrapper.find('button').text()).toBe('Delete');
  // });

  // it('Delete button is labeled "Deleting..." when saving', () => {
  //   const wrapper = setup(false, true);
  //   expect(wrapper.find('button').text()).toBe('Deleting...');
  // });
});