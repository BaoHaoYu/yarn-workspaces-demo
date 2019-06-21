import P2 from '@lerna-demo/p2'
import * as React from 'react'
// @ts-ignore
import s from './style.scss'

export interface IProps {
  value: string
}

const p1: React.FunctionComponent<IProps> = (props) => {
  return (
    <div className={s.p1}>
        <h1> {props.value}
        </h1>
      <P2 />
    </div>
  )
}

export default p1
