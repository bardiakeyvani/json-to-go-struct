'use babel';

import JsonToGoStructView from './json-to-go-struct-view';
import { CompositeDisposable } from 'atom';
const jsonToGo = require('./json-to-go');

export default {

  jsonToGoStructView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.jsonToGoStructView = new JsonToGoStructView(state.jsonToGoStructViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.jsonToGoStructView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'json-to-go-struct:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.jsonToGoStructView.destroy();
  },

  serialize() {
    return {
      jsonToGoStructViewState: this.jsonToGoStructView.serialize()
    };
  },

  toggle() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      console.log(selection);
      let formated = jsonToGo(selection);
      editor.insertText(formated.go.toString());
    }
  }

};
