import Enzyme, { shallow, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
// import 'core-js/stable';
import 'regenerator-runtime/runtime'

Enzyme.configure({
  adapter: new EnzymeAdapter()
});