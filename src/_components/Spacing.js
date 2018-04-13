import styled, { css } from 'styled-components';

const padding = props => props.padding !== undefined && css`
  padding: ${props.padding};
`;

const margin = props => props.margin !== undefined && css`
  margin: ${props.margin};
`;

const height = props => props.height !== undefined && css`
	height: ${props.height};
`;

const width = props => props.width !== undefined && css`
	width: ${props.width};
`;

export const Spacing = styled.div`
	${padding}
	${margin}
	${height}
	${width}
`;
