'use babel';

import JsonToGoStruct from '../lib/json-to-go-struct';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('JsonToGoStruct', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('json-to-go-struct');
  });

  describe('when the json-to-go-struct:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.json-to-go-struct')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'json-to-go-struct:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.json-to-go-struct')).toExist();

        let jsonToGoStructElement = workspaceElement.querySelector('.json-to-go-struct');
        expect(jsonToGoStructElement).toExist();

        let jsonToGoStructPanel = atom.workspace.panelForItem(jsonToGoStructElement);
        expect(jsonToGoStructPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'json-to-go-struct:toggle');
        expect(jsonToGoStructPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.json-to-go-struct')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'json-to-go-struct:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let jsonToGoStructElement = workspaceElement.querySelector('.json-to-go-struct');
        expect(jsonToGoStructElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'json-to-go-struct:toggle');
        expect(jsonToGoStructElement).not.toBeVisible();
      });
    });
  });
});
