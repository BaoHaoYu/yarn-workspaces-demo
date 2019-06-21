import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as React from 'react'
import P1, { IProps } from '../../packages/p1/src'

Enzyme.configure({ adapter: new Adapter() })

describe('all', () => {
  test('input', () => {
    const props: IProps = {
      value: 'dddd',
    }
    const input = shallow(<P1 {...props} />)
    expect(input.find('h1').text()).toEqual('dddd')
  })
})
