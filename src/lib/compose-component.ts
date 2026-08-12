import { createElement, type ComponentType, type ReactNode } from 'react';

type AnyComponent = ComponentType<any>;

interface ParentConfig {
  component: AnyComponent;
  props?: Record<string, unknown> | null;
  children?: ReactNode;
}

export const setParent = (
  component: AnyComponent,
  props: Record<string, unknown> | null = null,
  children: ReactNode = null
): ParentConfig => ({
  component,
  props,
  children,
});

interface ComposeParams {
  parentList?: Array<ParentConfig | AnyComponent>;
  child: AnyComponent;
}

function composeComponent({
  parentList = [],
  child,
}: ComposeParams): ReactNode {
  let result = createElement(child);

  for (let i = parentList.length - 1; i >= 0; i -= 1) {
    const item = parentList[i];

    if ('component' in item) {
      result = createElement(item.component, item.props, result);
    } else {
      result = createElement(item, null, result);
    }
  }

  return result;
}

export default composeComponent;