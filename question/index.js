/** 1. 信号灯控制器
用 React 实现一个信号灯（交通灯）控制器，要求：
1. 默认情况下，
  1.1. 红灯亮20秒，并且最后5秒闪烁
  1.2. 绿灯亮20秒，并且最后5秒闪烁
  1.3. 黄灯亮10秒
  1.4. 次序为 红-绿-黄-红-绿-黄
2. 灯的个数、颜色、持续时间、闪烁时间、灯光次序都可配置，如：
   lights=[{color: '#fff', duration: 10000, twinkleDuration: 5000}, ... ]
*/

import React from 'react'
import './App.scss'
class TrafficLightItem extends React.Component {

  constructor(props) {
    super(props);
    this.lights = props.lights || [
      {
        id: 1,
        color: 'red', // 灯色值
        duration: 1000 * 20,  // 持续时间
        twinkleDuration: 1000 * 5 // 闪烁持续时间
      },
      {
        id: 2,
        color: 'green', // 灯色值
        duration: 1000 * 20,  // 持续时间
        twinkleDuration: 1000 * 5 // 闪烁持续时间
      },
      {
        id: 3,
        color: 'yellow', // 灯色值
        duration: 1000 * 10,  // 持续时间
        twinkleDuration: 0 // 闪烁持续时间
      }
    ]
    this.state = {
      activation: { // 灯状态，亮起或闪烁
        id: 1,   // 当前的灯
        light: 1, // 是否亮起，取值0，1
        twinkle: 0, // 是否闪烁，取值0，1
      }
    }
  }

  async componentDidMount () {
    while (true) {
      await this.updateActivation()
    }
  }

  updateActivation = async () => {
    // 更新灯状态
    const lights = this.lights
    for (const item of lights) {
      this.setState({
        activation: {
          id: item.id,
          light: 1,
          twinkle: 0
        }
      })
      console.log(`灯id为${item.id}，色值为${item.color}，亮起，持续${item.duration / 1000}s`)
      await this.waitLights(item.duration)
      this.setState({
        activation: {
          id: item.id,
          light: 0,
          twinkle: 1
        }
      })
      console.log(`灯id为${item.id}，色值为${item.color}，闪烁，持续${item.twinkleDuration / 1000}s`)
      await this.waitLights(item.twinkleDuration)
    }
  }

  waitLights = (time) => new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })

  render () {
    const { id, light, twinkle } = this.state.activation
    const lights = this.lights.find(item => {
      return item.id === id
    })
    return (
      <div className="App">
        <div className="box">
          <div className="group-lamp">
            <div className={['lamp-item', light && 'activate', twinkle && 'twinkle'].join(' ')} style={{ backgroundColor: lights.color }}>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.lights = [{
      id: 1,
      color: 'red', // 灯色值
      duration: 1000 * 20,  // 持续时间
      twinkleDuration: 1000 * 5 // 闪烁持续时间
    },
    {
      id: 2,
      color: 'green', // 灯色值
      duration: 1000 * 20,  // 持续时间
      twinkleDuration: 1000 * 5 // 闪烁持续时间
    },
    {
      id: 3,
      color: 'yellow', // 灯色值
      duration: 1000 * 10,  // 持续时间
      twinkleDuration: 0 // 闪烁持续时间
    }]
  }
  render () {
    const lights = this.lights
    return <TrafficLightItem lights={lights}></TrafficLightItem>
  }
}


export default App;
