import Lightning from '@lightningjs/sdk/src/Lightning'

export class TitleButton extends Lightning.Component {
  static _template() {
    return {
      w: (w) => w,
      h: (h) => h,
      Background: {
        w: (w) => w,
        h: (h) => h,
        rect: true,
        Title: {
          text: {
            text: this.bindProp('title'),
          },
        },
      },
    }
  }

  _build() {
    this._backgroundTag = this.tag('Background')
    this._titleTag = this.tag('Title')
  }

  _setup() {
    this._patchProps()
    this._centerTitle()
  }

  _patchProps() {
    this.patch({
      Background: {
        color: this.unfocusedBgColor,
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: this.radius,
        },
        Title: {
          color: this.unfocusedTitleColor,
          text: {
            fontSize: this.titleSize,
          },
        },
      },
    })
  }

  _centerTitle() {
    this._titleTag.once('txLoaded', (tx) => {
      this.patch({
        Background: {
          Title: {
            x: (this.w - tx._source.renderInfo.w) / 2,
            y: (this.h - tx._source.renderInfo.h) / 2,
          },
        },
      })
    })
  }

  _getFocused() {
    return this
  }

  _unfocus() {
    this.patch({
      Background: {
        color: this.unfocusedBgColor,
        Title: {
          color: this.unfocusedTitleColor,
        },
      },
    })
  }

  _focus() {
    this.patch({
      Background: {
        color: this.focusedBgColor,
        Title: {
          color: this.focusedTitleColor,
        },
      },
    })
  }

  _handleEnter() {
    this.signal('click')
    return true
  }

  set radius(value) {
    this._radius = value
  }

  get radius() {
    return this._radius || 6
  }

  set titleSize(value) {
    this._titleSize = value
  }

  get titleSize() {
    return this._titleSize || 24
  }

  set unfocusedBgColor(value) {
    this._unfocusedBgColor = value
  }

  get unfocusedBgColor() {
    return this._unfocusedBgColor || 0xff454545
  }

  set focusedBgColor(value) {
    this._focusedBgColor = value
  }

  get focusedBgColor() {
    return this._focusedBgColor || 0xfff2f2f2
  }
  set unfocusedTitleColor(value) {
    this._unfocusedTitleColor = value
  }

  get unfocusedTitleColor() {
    return this._unfocusedTitleColor || 0xfff2f2f2
  }

  set focusedTitleColor(value) {
    this._focusedTitleColor = value
  }

  get focusedTitleColor() {
    return this._focusedTitleColor || 0xff282828
  }

  static get width() {
    return this.w || 200
  }

  static get height() {
    return this.w || 100
  }
}
