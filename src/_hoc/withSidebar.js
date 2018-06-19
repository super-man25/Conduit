import { connect } from 'react-redux';
import { actions as uiActions } from '_state/ui';

export const withSidebar = (WrappedComponent) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name;

  const mapSidebarToProps = (state) => ({
    isSidebarOpen: state.ui.sidebarIsOpen
  });

  const mapDispatchToProps = (dispatch) => ({
    toggleSidebar: () => dispatch(uiActions.toggleSidebar())
  });

  const ComponentWithSidebar = connect(mapSidebarToProps, mapDispatchToProps)(
    WrappedComponent
  );
  ComponentWithSidebar.displayName = `withSidebar${displayName}`;

  return ComponentWithSidebar;
};
