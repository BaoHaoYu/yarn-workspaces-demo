import P2 from '@bhy/p2'
import * as React from 'react'
// @ts-ignore
import s from './style.scss'
const p1: React.StatelessComponent<{ value: string }> = (props) => {
  return (
    <div className={s.p1}>
      p1 value = {props.value}
      <P2 />
    </div>
  )
}

export default p1
