import { text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import P1 from '../../packages/p1/src/index'

storiesOf('p1', module)
  .addDecorator(withKnobs)
  .add('demo', () => {
    const v = text('value', 'ddd')

    return (
      <div>
        <P1 value={v} />
      </div>
    )
  },
  {
    jest: ['p1']
  }
  )
