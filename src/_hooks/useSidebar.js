import { useSelector, useDispatch } from 'react-redux';

import { actions, selectors } from '_state/ui';

export function useSidebar() {
  const isSidebarOpen = useSelector(selectors.selectIsSidebarOpen);
  const dispatch = useDispatch();
  const toggleSidebar = () => dispatch(actions.toggleSidebar());

  return [isSidebarOpen, toggleSidebar];
}
