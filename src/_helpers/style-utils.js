import styled from 'styled-components';
// Sizes based on common resolutions above 1024px (our min width)
export const sizes = {
  large: 1440,
  medium: 1280,
  small: 1120,
  xSmall: 1024,
};

export const withBoxModelProps = (styledComponent) => {
  return styled(styledComponent)`
    margin: ${(props) => props.margin};
    margin-top: ${(props) => props.marginTop};
    margin-bottom: ${(props) => props.marginBottom};
    margin-left: ${(props) => props.marginLeft};
    margin-right: ${(props) => props.marginRight};

    padding: ${(props) => props.padding};
    padding-top: ${(props) => props.paddingTop};
    padding-bottom: ${(props) => props.paddingBottom};
    padding-left: ${(props) => props.paddingLeft};
    padding-right: ${(props) => props.paddingRight};

    border: ${(props) => props.border};
    border-top: ${(props) => props.borderTop};
    border-bottom: ${(props) => props.borderBottom};
    border-left: ${(props) => props.borderLeft};
    border-right: ${(props) => props.borderRight};
  `;
};
