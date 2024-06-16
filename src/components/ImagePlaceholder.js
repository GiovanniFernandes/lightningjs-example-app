import Lightning from '@lightningjs/sdk/src/Lightning'

export class ImagePlaceholder extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      shader: {
        type: Lightning.shaders.RoundedRectangle,
        radius: 12,
      },
      color: 0xff282828,
      TextPlaceholder: {
        color: 0xfff2f2f2,
        text: {
          text: this.bindProp('placeholder'),
        },
      },
    }
  }

  _build() {
    this._textPlaceholderTag = this.tag('TextPlaceholder')
  }

  _setup() {
    this._textPlaceholderTag.on('txLoaded', (tx) => {
      this.patch({
        TextPlaceholder: {
          x: (this.w - tx._source.renderInfo.w) / 2,
          y: (this.h - tx._source.renderInfo.h) / 2,
        },
      })
    })
  }
}
