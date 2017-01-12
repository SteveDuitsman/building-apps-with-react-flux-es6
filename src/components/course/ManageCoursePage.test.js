import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
// unnamed import, uses the default export
//import ManageCoursePage from './ManageCoursePage';
// Named import, uses the named export, not the default
import {ManageCoursePage} from './ManageCoursePage';

describe('Manage Course Page', () => {
  it('sets error message when trying to save empty title', () => {
    const props = {
      authors: [],
      course: {
        id: '',
        watchHref: '',
        title: '',
        authorId: '',
        length: '',
        category: ''
      },
      actions: { saveCourse: () => { return Promise.resolve(); }},
      router: { setRouteLeaveHook: () => { return null; }}
    };

    // mount - renders multiple layers, unlike shallow
    // authors array was mapped by the mapStateToProps method.
    //    since we're using the bare component, we need to set authors array ourselves
    const wrapper = mount(<ManageCoursePage {...props} />);

    // Wrap with provider, pass store
    //const wrapper = mount(<Provider store={store}><ManageCoursePage /></Provider>);
  
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');

    saveButton.simulate('click');

    expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
  });
});