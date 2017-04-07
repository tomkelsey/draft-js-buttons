import React, { Component } from 'react';
import { RichUtils, EditorState } from 'draft-js';

export default ({ children }) => (
  class linkButton extends Component {

    activate = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const url = window.prompt('Enter/Paste URL...');
      const editorState = this.props.getEditorState();
      if (url) {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('link', 'IMMUTABLE', { url });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        this.props.setEditorState(
          RichUtils.toggleLink(
            editorState,
            editorState.getSelection(),
            entityKey,
          )
        );
      } else {
        this.props.setEditorState(
          RichUtils.toggleLink(
            editorState,
            editorState.getSelection(),
            null,
          )
        );
      }
      EditorState.forceSelection(
        editorState,
        editorState.getCurrentContent().getSelectionAfter()
      );
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
