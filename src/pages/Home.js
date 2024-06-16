import { Router, Utils } from '@lightningjs/sdk'
import Lightning from '@lightningjs/sdk/src/Lightning'
import { TitleButton } from '../components'

export class Home extends Lightning.Component {
  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        color: 0xfffbb03b,
        src: Utils.asset('images/background.png'),
      },
      Logo: {
        mountX: 0.5,
        mountY: 1,
        x: 960,
        y: 600,
        src: Utils.asset('images/logo.png'),
      },
      Text: {
        mount: 0.5,
        x: 960,
        y: 720,
        text: {
          text: "Let's start Building!",
          fontFace: 'Regular',
          fontSize: 64,
          textColor: 0xbbffffff,
        },
      },
      Button: {
        type: TitleButton,
        x: 25,
        y: 125,
        w: 200,
        h: 70,
        title: 'Press Me',
        signals: {
          click: '_handleButtonClick',
        },
      },
    }
  }

  _build() {
    this._buttonTag = this.tag('Button')
  }

  _init() {
    this.tag('Background')
      .animation({
        duration: 15,
        repeat: -1,
        actions: [
          {
            t: '',
            p: 'color',
            v: { 0: { v: 0xfffbb03b }, 0.5: { v: 0xfff46730 }, 0.8: { v: 0xfffbb03b } },
          },
        ],
      })
      .start()
    this._setState('InitState')
  }

  _handleButtonClick() {
    Router.navigate('images-panel')
  }

  static _states() {
    return [
      class InitState extends this {
        _getFocused() {
          return this
        }
        _handleDown() {
          this._setState('ButtonState')
        }
      },
      class ButtonState extends this {
        _getFocused() {
          return this._buttonTag
        }
        _handleUp() {
          this._setState('InitState')
        }
      },
    ]
  }
}
