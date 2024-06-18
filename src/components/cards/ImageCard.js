import Lightning from '@lightningjs/sdk/src/Lightning'

export class ImageCard extends Lightning.Component {
  static _template() {
    return {
      w: (w) => w,
      h: (h) => h,
      Background: {
        w: (w) => w,
        h: (h) => h,
        rect: true,
        Fallback: {
          rect: true,
          color: 0xff282828,
        },
        Image: {
          src: this.bindProp('imgUrl'),
        },
      },
    }
  }

  _build() {
    this._backgroundTag = this.tag('Background')
  }

  _setup() {
    this._patchProps()
  }

  _patchProps() {
    this.patch({
      Background: {
        color: this.unfocusedBgColor,
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: this.radius,
        },
        Fallback: {
          shader: {
            type: Lightning.shaders.RoundedRectangle,
            radius: this.radius,
          },
          x: this.borderWidth,
          y: this.borderWidth,
          w: this.w - 2 * this.borderWidth,
          h: this.h - 2 * this.borderWidth,
        },
        Image: {
          shader: {
            type: Lightning.shaders.RoundedRectangle,
            radius: this.radius,
          },
          x: this.borderWidth,
          y: this.borderWidth,
          w: this.w - 2 * this.borderWidth,
          h: this.h - 2 * this.borderWidth,
        },
      },
    })
  }

  _getFocused() {
    return this
  }

  _unfocus() {
    this.patch({
      Background: {
        color: this.unfocusedBgColor,
      },
    })
  }

  _focus() {
    this.patch({
      Background: {
        color: this.focusedBgColor,
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
    return this._radius || 12
  }

  set borderWidth(value) {
    this._borderWidth = value
  }

  get borderWidth() {
    return this._borderWidth || 4
  }

  set unfocusedBgColor(value) {
    this._unfocusedBgColor = value
  }

  get unfocusedBgColor() {
    return this._unfocusedBgColor || 0x00000000
  }

  set focusedBgColor(value) {
    this._focusedBgColor = value
  }

  get focusedBgColor() {
    return this._focusedBgColor || 0xfff2f2f2
  }

  static get width() {
    return this.w || 225
  }

  static get height() {
    return this.h || 400
  }
}
