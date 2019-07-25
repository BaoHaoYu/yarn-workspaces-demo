import P2 from '@lerna-demo/p2'
import * as React from 'react'
// @ts-ignore
import s from './style.scss'
export interface IProps {
  value: string
  didMount?: any
}

class P1 extends React.Component<IProps> {
  public state = { msg: '', didMount: false }
  public componentDidMount() {
    this.setState({ ...this.state, didMount: true })
    this.props.didMount && this.props.didMount()
  }
  public render() {
    const changeMsg = () => {
      this.setState({ msg: 'hehehehehe' })
    }
    return (
      <div className={s.p1}>
        <h1>{this.props.value}</h1>

        <h3>{this.state.msg}</h3>

        <div className={s.p1__change} onClick={changeMsg}>
          change msg
        </div>

        {this.state.didMount && 'did Mount text'}
        <P2 />
      </div>
    )
  }
}

export default P1
