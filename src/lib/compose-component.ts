import { createElement } from 'react';

export const setParent = (component, props = null, children = null) => {
  return { component, props, children };
};

/**
 * @param {Object} params - Parameters object.
 * @param {node} params.parentList - List of wrapper components.
 * @param {node} params.child - Children node.
 * @return {node} Composed node output.
 *
 * Will return something like this.
 * React.createElement(PageProvider1, null,
 * React.createElement(Provider2, null,
 * React.createElement(Provider3, null,
 * React.createElement(Child, null))));
 */

function composeComponent(params) {
  const { parentList, child } = params;

  let result = createElement(child);

  for (let i = parentList.length; i > 0; i -= 1) {
    const item = parentList[i - 1];

    result = createElement(item?.component || item, item?.props || null, result);
  }

  return result;
}

export default composeComponent;
