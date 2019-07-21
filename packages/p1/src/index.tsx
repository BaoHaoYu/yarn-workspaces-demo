import P2 from '@lerna-demo/p2'
import 'lodash-es'
import * as React from 'react'
// @ts-ignore
import s from './style.scss'
export interface IProps {
  value: string
}

const p1: React.FunctionComponent<IProps> = (props) => {
  const [state, setState] = React.useState({ msg: '' })
  const changeMsg = () => {
    setState({ msg: 'hehehehehe' })
  }
  return (
    <div className={s.p1}>
      <h1>{props.value}</h1>

      <h3>{state.msg}</h3>

      <div className={s.p1__change} onClick={changeMsg}>
        change msg
      </div>
      <P2 />
    </div>
  )
}

export default p1
