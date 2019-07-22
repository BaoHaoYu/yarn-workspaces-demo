// @ts-nocheck
import './_hook'

import { assert } from 'chai'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as React from 'react'
import P1, { IProps } from '../../packages/p1/src'
// @ts-ignore
import s from '../../packages/p1/src/style.scss'
Enzyme.configure({ adapter: new Adapter() })

describe('all', () => {
  it('input', () => {
    const props: IProps = {
      value: 'dddd',
      didMount() {
        console.log('didMount')
      },
    }
    const p1 = shallow(<P1 {...props} />)
    assert.strictEqual(p1.find('h1').text(), 'dddd')

    p1.find('.' + s.p1__change).simulate('click')
    console.log('p1 html = ', p1.html())

    assert.strictEqual(p1.find('h3').text(), 'hehehehehe')
  })
})
