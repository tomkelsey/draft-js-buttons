import React, { Component } from 'react';
import {
  RichUtils,
  Entity,
} from 'draft-js';

export default ({ children }) => (
  class linkButton extends Component {

    activate = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const url = window.prompt('Enter URL');
      if (url) {
        console.log(url);
        const entityKey = Entity.create('LINK', 'MUTABLE', { url });
        console.log(1);
        const editorState = this.props.getEditorState();
        console.log(2);
        this.props.setEditorState(
          RichUtils.toggleLink(
            editorState,
            editorState.getSelection(),
            entityKey,
          )
        );
        console.log(3);
        // EditorState.forceSelection(
        //   this.props.getEditorState(),
        //   editorState.getCurrentContent().getSelectionAfter()
        // );
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
