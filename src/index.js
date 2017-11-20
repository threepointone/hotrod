// @flow
import Reconciler from 'react-reconciler';
import type { Node } from 'react';

const emptyObject = {};

function shallowDiff(older, newer) {
  const ret = {};
  new Set(Object.keys(newer).concat(Object.keys(older))).forEach(key => {
    if (newer[key] !== older[key]) {
      ret[key] = newer[key];
    }
  });
  return ret;
}

function applyProps(element, props) {
  Object.assign(element, props);
  // todo - style, events
}

// this is for creating "real" elements in your target *OM
function createElement(type, { children, ...props }) {
  return document.createElement(type);
}

function getHostContextNode(instance: any) {
  return instance;
}

const ReconcilerConfig = {
  appendInitialChild(parentInstance, child) {
    parentInstance.appendChild(child);
  },

  createInstance(type, props, internalInstanceHandle) {
    return createElement(type, props);
  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    return document.createTextNode(text);
  },

  finalizeInitialChildren(element, type, { children, ...props }) {
    applyProps(element, props);
    return false;
  },

  getPublicInstance(inst) {
    return inst;
  },

  prepareUpdate(
    element,
    type,
    { children: oldChildren, ...oldProps },
    { children: newChildren, ...newProps },
  ) {
    return shallowDiff(oldProps, newProps);
  },

  prepareForCommit() {
    // noop
  },

  resetAfterCommit() {
    // noop
  },

  resetTextContent(element) {
    // noop
  },

  getRootHostContext(rootInstance) {
    return getHostContextNode(rootInstance);
  },
  // ????

  getChildHostContext() {
    return emptyObject;
  },

  shouldSetTextContent(type, props) {
    return (
      type === 'textarea' ||
      typeof props.children === 'string' ||
      typeof props.children === 'number' ||
      (typeof props.dangerouslySetInnerHTML === 'object' &&
        props.dangerouslySetInnerHTML !== null &&
        typeof props.dangerouslySetInnerHTML.__html === 'string')
    );
  },

  shouldDeprioritizeSubtree(type, props): boolean {
    return !!props.hidden;
  },

  now: () => performance.now(),

  useSyncScheduling: true,

  mutation: {
    appendChild(parentInstance, child) {
      parentInstance.appendChild(child);
    },

    appendChildToContainer(parentInstance, child) {
      parentInstance.appendChild(child);
    },

    removeChild(parentInstance, child) {
      parentInstance.removeChild(child);
    },

    removeChildFromContainer(parentInstance, child) {
      parentInstance.removeChild(child);
    },

    insertBefore(parentInstance, child, beforeChild) {
      parentInstance.insertBefore(child, beforeChild);
    },
    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      applyProps(instance, updatePayload);
    },

    commitMount(instance, updatePayload, type, oldProps, newProps) {
      // noop
    },

    commitTextUpdate(textInstance, oldText, newText) {
      textInstance.nodeValue = newText;
    },
  },
};

const MyRenderer = Reconciler(ReconcilerConfig);

export function render(element: Node, container: HTMLElement) {
  const node = MyRenderer.createContainer(container);
  MyRenderer.updateContainer(element, node);
  // Call MyRenderer.updateContainer() to schedule changes on the roots.
}

// style
// events
// devtools
// attrs vs props. what's the dealeo?
// text stuff?
// what is updateFiberProps?
