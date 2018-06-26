import { connect } from 'react-redux';
import { actions, selectors } from '_state/ui';

export const withSidebar = (WrappedComponent) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name;

  const mapSidebarToProps = (state) => ({
    isSidebarOpen: selectors.selectIsSidebarOpen(state)
  });

  const ComponentWithSidebar = connect(mapSidebarToProps, {
    toggleSidebar: actions.toggleSidebar
  })(WrappedComponent);
  ComponentWithSidebar.displayName = `withSidebar${displayName}`;

  return ComponentWithSidebar;
};
