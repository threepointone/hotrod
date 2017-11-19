// @flow
import Reconciler from 'react-reconciler';
import type { Node } from 'react';

function log() {
  console.log(this);
  return this;
}

const emptyObject = {};

//sitrep
function shallowDiff(older, newer) {
  const ret = {};
  new Set(Object.keys(newer).concat(Object.keys(older))).forEach(key => {
    if (newer[key] !== older[key]) {
      ret[key] = newer[key];
    }
  });
  return ret;
}

// this is for creating "real" elements in your target *OM
function createElement(type, { children, ...props }) {
  const el = document.createElement(type);
  // should this be in finalizeInitialChildren?
  Object.assign(el, props);
  return el;
}

function getHostContextNode(instance: any) {
  return instance;
}

const ReconcilerConfig = {
  // sitrep
  appendInitialChild(parentInstance, child) {
    parentInstance.appendChild(child);
  },

  createInstance(type, props, internalInstanceHandle) {
    return createElement(type, props);
  },
  // sitrep
  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    return document.createTextNode(text);
  },

  // sitrep
  finalizeInitialChildren(element, type, props) {
    return false;
  },
  // sitrep
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

  // sitrep
  prepareForCommit() {
    // noop
  },
  // sitrep
  resetAfterCommit() {
    // noop
  },

  // sitrep
  resetTextContent(element) {
    // noop
  },
  // sitrep
  getRootHostContext(rootInstance) {
    return getHostContextNode(rootInstance);
  },
  // ????
  // sitrep
  getChildHostContext() {
    return emptyObject;
  },
  // sitrep
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
    // sitrep
    appendChild(parentInstance, child) {
      parentInstance.appendChild(child);
    },
    // sitrep
    appendChildToContainer(parentInstance, child) {
      parentInstance.appendChild(child);
    },
    // sitrep
    removeChild(parentInstance, child) {
      parentInstance.removeChild(child);
    },
    // sitrep
    removeChildFromContainer(parentInstance, child) {
      parentInstance.removeChild(child);
    },
    // sitrep
    insertBefore(parentInstance, child, beforeChild) {
      parentInstance.insertBefore(child, beforeChild);
    },
    commitUpdate(
      instance,
      updatePayload,
      type,
      { children: oldChildren, ...oldProps },
      { children: newChildren, ...newProps },
    ) {
      Object.assign(instance, updatePayload);
    },
    // sitrep
    commitMount(instance, updatePayload, type, oldProps, newProps) {
      // noop
    },
    // sitrep
    commitTextUpdate(textInstance, oldText, newText) {
      textInstance.nodeValue = newText;
    },
  },
};

const MyRenderer = Reconciler(ReconcilerConfig);

export function render(
  element: Node,
  container: HTMLElement,
  callback?: void => void,
) {
  const node = MyRenderer.createContainer(container);
  MyRenderer.updateContainer(element, node);
  // Call MyRenderer.updateContainer() to schedule changes on the roots.
}

// todo
// updates / state
// events
// attrs vs props. what's the dealeo?
// text stuff?
// what is updateFiberProps?
