import React from 'react';
import {RichContentEditor, Modal} from '../src/index';
import {shallow} from 'enzyme';
import TestData from './TestData/initial-state'



describe('RichContentEditor', () => {
  it('should render', () => {
    expect(shallow(<RichContentEditor/>).html()).toEqual(expect.stringContaining('class="DraftEditor-root"'));
  });
  it('should render edit mode', () => {
    expect(shallow(<RichContentEditor/>).html()).toEqual(expect.stringContaining('contenteditable="true"'));
  });
  it('should render read only mode', () => {
    expect(shallow(<RichContentEditor readOnly={true}/>).html()).toEqual(expect.stringContaining('contenteditable="false"'));
  });
  it('should render text only', () => {
    expect(shallow(<RichContentEditor initialState={TestData.onlyText}/>).html()).toEqual(expect.stringContaining('Hello text only'));
  });
  it('should render legacy image', () => {
    expect(shallow(<RichContentEditor initialState={TestData.legacyImage} readOnly={true}/>).html()).toEqual(expect.stringContaining('https://unsplash.it/500/500?image=20'));
  });
  it('should render image', () => {
    expect(shallow(<RichContentEditor initialState={TestData.image} readOnly={true}/>).html()).toEqual(expect.stringContaining('https://unsplash.it/500/500?image=20'));
  });
  // it('should render legacy video', () => {
  //   expect(render(<RichContentEditor initialState={TestData.legacyVideo} readOnly={true} theme={{aaaa: 'aaaa'}}/>).html()).toEqual(expect.stringContaining('https://www.youtube.com/watch?v=eqZVIiD6wSg'));
  // });
  // it('should render video', () => {
  //   expect(render(<RichContentEditor initialState={TestData.video} readOnly={true}/>).html()).toEqual(expect.stringContaining('https://www.youtube.com/watch?v=eqZVIiD6wSg'));
  // });
  it('should render html', () => {
    expect(shallow(<RichContentEditor initialState={TestData.html} readOnly={true}/>).html()).toEqual(expect.stringContaining('youtube'));
  });
  it('should render divider', () => {
    expect(shallow(<RichContentEditor initialState={TestData.divider} readOnly={true}/>).html()).toEqual(expect.stringContaining('viewBox="0 0 500 46"'));
  });
  it('should render gallery', () => {
    expect(shallow(<RichContentEditor initialState={TestData.gallery} readOnly={true}/>).html()).toEqual(expect.stringContaining('class="pro-gallery"'));
  });
});

describe('Modal', () => {
  it('should render', () => {
    const Element = props => {
      return <div id="someId"></div>;
    };
    const wrapper = shallow(<Modal element={Element} keyName='someName' store={{}} componentData={{}} componentState={{}}/>);
    expect(wrapper.html()).toEqual(expect.stringContaining('id="someId"'));
  });
});
