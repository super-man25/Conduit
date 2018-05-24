import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
// import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
