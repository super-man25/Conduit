import styled from 'styled-components';
import defaultAvatarImg from '../_images/defaultavatar.png';

const avatarImg = (props) => { return props.user.avatar ? `url(${ props.user.avatar })` : `url(${ defaultAvatarImg })`; };

export const UserAvatar = styled.div`
  height: 100%;
  width: 40px;
  float: right;
  margin: 0;
  padding: 0;
  background: none;
  background-image: ${avatarImg};
  background-position: center center;
  background-repeat: no-repeat;
`;
