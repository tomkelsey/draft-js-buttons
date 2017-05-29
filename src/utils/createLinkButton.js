import React, { Component } from 'react';
import { RichUtils, EditorState } from 'draft-js';

function getCurrentEntityKey(editorState) {
  const selection = editorState.getSelection();
  const anchorKey = selection.getAnchorKey();
  const contentState = editorState.getCurrentContent();
  const anchorBlock = contentState.getBlockForKey(anchorKey);
  const offset = selection.anchorOffset;
  const index = selection.isBackward ? offset - 1 : offset;
  return anchorBlock.getEntityAt(index);
}

function getCurrentEntity(editorState) {
  const contentState = editorState.getCurrentContent();
  const entityKey = getCurrentEntityKey(editorState);
  if (entityKey) {
    return contentState.getEntity(entityKey);
  }
  return null;
}

function hasEntity(entityType, editorState) {
  const entity = getCurrentEntity(editorState);
  if (entity && entity.getType() === entityType) {
    return true;
  }
  return false;
}

export default ({ children }) => (
  class linkButton extends Component {

    activate = (event) => {
      event.preventDefault();
      event.stopPropagation();

      const editorState = this.props.getEditorState();

      let url = '';
      const entitySelected = hasEntity('link', editorState);
      if (entitySelected) {
        const entity = getCurrentEntity(editorState);
        if (entity) {
          const data = entity.getData();
          url = data.url;
        }
      }

      url = window.prompt('Enter/Paste URL...', url);

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
