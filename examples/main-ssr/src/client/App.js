/* eslint-disable */
import React, { Suspense } from 'react';
import MobileDetect from 'mobile-detect';
import { convertFromRaw, convertToRaw, EditorState } from '@wix/draft-js';
import { normalizeInitialState } from 'wix-rich-content-common';
import './App.scss';
import RichContentRawDataEditor from './RichContentRawDataEditor';
import Editor from './editor/Editor';
import Viewer from './viewer/Viewer';
import Resizable from 're-resizable';
import startCase from 'lodash/startCase';
import cloneDeep from 'lodash/cloneDeep';
import local from 'local-storage';

// const whyDidYouRender = require('@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js');
// whyDidYouRender(React, { include: [/.*/], exclude: [/Decor|JSONI/] });

const anchorTarget = '_top';
const relValue = 'noreferrer';
function Checkbox({ name, onChange, ...inputProps }) {
  const handleChange = e => onChange(name, e.target.checked);
  return (
    <label>
      <input type="checkbox" onChange={handleChange} {...inputProps} />
      {startCase(name)}
    </label>
  );
}

const checkBoxes = [
  'editor',
  'viewer',
  'contentStateEditor',
  'mounted',
  'staticToolbar',
  'mobile',
  'readOnly',
];
const mobileCheckBoxes = ['editor', 'viewer'];

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lastSave: new Date(),
      editorState: EditorState.createEmpty(),
      mounted: true,
      contentStateEditor: true,
      showDevToggles: true,
      editor: false,
      viewer: true,
      viewerState: {

    entityMap: {
      '4': {
        type: 'wix-draft-plugin-html',
        mutability: 'IMMUTABLE',
        data: {
          src: 'https://www.youtube.com/embed/owsfdh4gxyc',
          config: {
            width: 200,
            height: 200,
            safe: true,
            isSrc: true,
          },
        },
      },
      '5': {
        type: 'wix-draft-plugin-html',
        mutability: 'IMMUTABLE',
        data: {
          src: 'https://www.youtube.com/embed/owsfdh4gxyc',
          srcType: 'url',
          config: {
            width: 500,
            height: 200,
            safe: true,
          },
        },
      },
      '6': {
        type: 'wix-draft-plugin-divider',
        mutability: 'IMMUTABLE',
        data: {
          type: 'dashed',
          config: {
            size: 'medium',
          },
        },
      },
    },
    blocks: [
      {
        key: '9gm3s',
        text:
          'Spicy jalapeno #bacon ipsum dolor amet kevin shank ground round, andouille tail shoulder venison strip steak biltong pastrami alcatra ribeye. Porchetta doner tail brisket chicken. Shank jerky flank, pastrami frankfurter hamburger burgdoggen filet mignon salami pork chop. Jerky swine short loin picanha porchetta, prosciutto short ribs jowl chuck burgdoggen brisket turkey.',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: 'ov8f',
        text: ' ',
        type: 'atomic',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 6,
          },
        ],
        data: {},
      },
      {
        key: 'ov8w',
        text: ' ',
        type: 'atomic',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 4,
          },
        ],
        data: {},
      },
      {
        key: 'ov8t',
        text: ' ',
        type: 'atomic',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 5,
          },
        ],
        data: {},
      },
      {
        key: 'e23a8',
        text:
          'Meatball.com rump tri-tip short ribs frankfurter chuck. Salami turkey ham, ball tip shankle chicken pork jerky venison beef ribs pastrami sausage bresaola. Beef ribs pork salami fatback tenderloin cupim, picanha porchetta pancetta hamburger pig pork loin chuck jerky bresaola. T-bone biltong landjaeger ham hock meatball tri-tip pancetta kevin chicken turducken drumstick tenderloin beef ribs tail. Sausage t-bone ham hock, bacon chicken jowl venison turkey bresaola tongue hamburger.',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: '5g8yu',
        text:
          'Biltong landjaeger andouille, doner prosciutto tri-tip sirloin shank. Ribeye capicola biltong pastrami burgdoggen. Filet mignon kielbasa capicola landjaeger pig hamburger, corned beef meatloaf swine meatball. Frankfurter brisket rump, pork fatback strip steak boudin cupim landjaeger sirloin venison pastrami cow pork chop chuck.',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ]
      },
      ...this.getLocalStorageState(),
    };
    this.md = typeof window !== 'undefined' ? new MobileDetect(window.navigator.userAgent) : null;
  }

  getLocalStorageState() {
    const state = {};
    [...checkBoxes, 'contentWidth'].forEach(key => {
      let val = local.get(key);
      if (val !== null) {
        state[key] = val;
      }
    });
    return state;
  }

  onEditorChange = editorState => {
    const state = {
      lastSave: new Date(),
      editorState,
    };

    const content = editorState.getCurrentContent();
    if (content !== this.state.editorState.getCurrentContent()) {
      state.viewerState = convertToRaw(content);
    }
    this.setState(state);
  };

  isMobileDevice = () => {
    return this.md && this.md.mobile() !== null;
  };

  onRichContentRawDataEditorChange = obj => {
    this.setState(this.convertJsObject(obj));
  };

  convertJsObject(obj) {
    const normalizedState = normalizeInitialState(obj, {
      anchorTarget,
      relValue,
    });
    const editorState = EditorState.createWithContent(convertFromRaw(normalizedState));
    return { editorState, viewerState: normalizedState };
  }

  onCheckBoxChange = (name, checked) => {
    this.setState({ [name]: checked });
    local.set(name, checked);
  };

  render() {
    const {
      showDevToggles,
      mobile: simulateMobile,
      editor: showEditor,
      viewer: showViewer,
      contentStateEditor: showContentStateEditor,
    } = this.state;
    const isMobileDevice = this.isMobileDevice();
    const isMobile = simulateMobile || isMobileDevice;
    const editor = (
      <Editor
        onChange={this.onEditorChange}
        editorState={this.state.editorState}
        readOnly={this.state.readOnly}
        mobile={isMobile}
        staticToolbar={this.state.staticToolbar}
      />
    );
    const viewer = (
      <Viewer initialState={this.state.viewerState} mobile={isMobile} config={this.config} />
    );
    const checkBoxComponents = (isMobileDevice ? mobileCheckBoxes : checkBoxes).map(name => (
      <div className="toggle">
        <Checkbox name={name} checked={this.state[name]} onChange={this.onCheckBoxChange} />
      </div>
    ));
    return (
      <div className="wrapper">
        <div className="container">
          {!isMobileDevice && (
            <div className="header">
              <h1 onClick={() => this.setState({ showDevToggles: !showDevToggles })}>
                Wix Rich Content Editor
              </h1>
              <div
                className="toggle-container"
                style={{ display: this.state.showDevToggles ? 'block' : 'none' }}
              >
                {checkBoxComponents}
              </div>
              <span className="intro">Last saved on {this.state.lastSave.toTimeString()}</span>
            </div>
          )}
          <div className="content">
            {this.state.mounted && (
              <div className="columns">
                {isMobileDevice ? (
                  <div className={'mobileDevice'} style={{ width: '100%' }}>
                    <div style={{ display: 'flex' }}>{checkBoxComponents}</div>
                    {showEditor && editor}
                    {showViewer && viewer}
                  </div>
                ) : (
                  <Resizable
                    onResize={(event, direction, { clientWidth }) =>
                      local.set('contentWidth', clientWidth)
                    }
                    defaultSize={{ width: this.state.contentWidth || '85%' }}
                    className={'resizable'}
                  >
                    {showEditor && editor}
                    {showViewer && viewer}
                  </Resizable>
                )}
                {showContentStateEditor && !isMobileDevice && (
                  <div className="column side">
                    <RichContentRawDataEditor
                      onChange={this.onRichContentRawDataEditorChange}
                      content={cloneDeep(convertToRaw(this.state.editorState.getCurrentContent()))}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
