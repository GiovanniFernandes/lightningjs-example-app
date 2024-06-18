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
      ScreenTitle: {
        y: 80,
        text: {
          text: "Let's start Building!",
          fontFace: 'Regular',
          fontSize: 64,
          textColor: 0xbbffffff,
        },
      },
      Logo: {
        mountX: 0.5,
        mountY: 1,
        x: 960,
        y: 600,
        src: Utils.asset('images/logo.png'),
      },
      Caption: {
        y: 620,
        text: {
          textAlign: 'center',
          text: 'Use the arrows to move the focused element and press enter to interact.',
          fontFace: 'Regular',
          fontSize: 32,
          textColor: 0xbbffffff,
        },
      },
      Button: {
        type: TitleButton,
        x: (1920 - 200) / 2,
        y: 800,
        w: 200,
        h: 70,
        title: 'Images Panel',
        signals: {
          click: '_handleButtonClick',
        },
      },
      ListButton: {
        type: TitleButton,
        x: (1920 - 200) / 2,
        y: 880,
        w: 200,
        h: 70,
        title: 'Images List',
        signals: {
          click: '_handleListButtonClick',
        },
      },
    }
  }

  _build() {
    this._screenTitleTag = this.tag('ScreenTitle')
    this._captionTag = this.tag('Caption')
    this._buttonTag = this.tag('Button')
    this._listButtonTag = this.tag('ListButton')
  }

  _setup() {
    this._centerElementHorizontally(this._screenTitleTag)
    this._centerElementHorizontally(this._captionTag)
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
    this._setState('ButtonState')
  }

  _centerElementHorizontally(elementTag) {
    console.log(elementTag)
    elementTag.once('txLoaded', (tx) => {
      elementTag.x = (1920 - tx._source.renderInfo.w) / 2
    })
  }

  _handleButtonClick() {
    Router.navigate('images-panel')
  }

  _handleListButtonClick() {
    Router.navigate('images-list')
  }

  static _states() {
    return [
      class ButtonState extends this {
        _getFocused() {
          return this._buttonTag
        }

        _handleDown() {
          this._setState('ListButtonState')
        }
      },
      class ListButtonState extends this {
        _getFocused() {
          return this._listButtonTag
        }

        _handleUp() {
          this._setState('ButtonState')
        }
      },
    ]
  }
}
