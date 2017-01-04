import React, { Component } from 'react';
import {
  RichUtils,
  Entity,
  EditorState,
} from 'draft-js';

export default ({ children }) => (
  class linkButton extends Component {

    activate = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const url = window.prompt('Enter URL');
      if (url) {
        const entityKey = Entity.create('LINK', 'MUTABLE', { url });
        const editorState = this.props.getEditorState();
        const newEditorState = RichUtils.toggleLink(
          editorState,
          editorState.getSelection(),
          entityKey,
        );
        EditorState.forceSelection(
          newEditorState,
          editorState.getCurrentContent().getSelectionAfter()
        );
      }
    }

    preventBubblingUp = (event) => { event.preventDefault(); }

    render() {
      const { theme } = this.props;
      return (
        <div
          className={theme.buttonWrapper}
          onMouseDown={this.preventBubblingUp}
        >
          <button
            className={theme.button}
            onClick={this.activate}
            type="button"
            children={children}
          />
        </div>
      );
    }
  }
);
