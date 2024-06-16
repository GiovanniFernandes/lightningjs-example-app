import Lightning from '@lightningjs/sdk/src/Lightning'
import { TitleButton } from '../components'
import { Router } from '@lightningjs/sdk'

export class ImagesPanel extends Lightning.Component {
  static _template() {
    return {
      w: 1920,
      h: 1080,
      rect: true,
      color: 0xff1c1b1e,
      BackButton: {
        type: TitleButton,
        title: 'Back',
        w: 100,
        h: 60,
        x: 30,
        y: 30,
        signals: { click: '_handleBackClick' },
      },
    }
  }

  _build() {
    this._backButtonTag = this.tag('BackButton')
  }

  _setup() {
    this._setState('BackButtonState')
  }

  _handleBackClick() {
    Router.back()
  }

  static _states() {
    return [
      class BackButtonState extends this {
        _getFocused() {
          return this._backButtonTag
        }
      },
    ]
  }
}
