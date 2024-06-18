import Lightning from '@lightningjs/sdk/src/Lightning'
import { List } from '@lightningjs/ui'
import { ImageCard, TitleButton } from '../components'
import { Router } from '@lightningjs/sdk'

export class ImagesList extends Lightning.Component {
  static _template() {
    return {
      w: 1920,
      h: 1080,
      color: 0xff1c1b1e,
      rect: true,
      BackButton: {
        type: TitleButton,
        title: 'Back',
        w: 100,
        h: 60,
        x: 30,
        y: 30,
        signals: { click: '_handleBackClick' },
      },
      ScreenTitle: {
        y: 50,
        text: {
          text: 'Images List',
          fontSize: 48,
        },
      },
      AddButton: {
        type: TitleButton,
        w: 300,
        h: 90,
        x: 25,
        y: 170,
        title: 'Add Items',
        signals: {
          click: '_handleAddButtonClick',
        },
      },
      ClearButton: {
        type: TitleButton,
        w: 300,
        h: 90,
        x: 345,
        y: 170,
        title: 'Clear Items',
        signals: {
          click: '_handleClearButtonClick',
        },
      },
      ContentList: {
        type: List,
        direction: 'row',
        spacing: 20,
        x: 25,
        y: 290,
        w: 1875,
        h: 100,
      },
    }
  }

  _build() {
    this._backButtonTag = this.tag('BackButton')
    this._screenTitleTag = this.tag('ScreenTitle')
    this._addButtonTag = this.tag('AddButton')
    this._clearButtonTag = this.tag('ClearButton')
    this._contentListTag = this.tag('ContentList')

    this._slidesCount = 5

    const slides = Array.from(Array(this._slidesCount).keys()).map((value) =>
      this._createCards(value),
    )

    this._contentListTag.items = slides
  }

  _setup() {
    this._screenTitleTag.once('txLoaded', (tx) => {
      this.patch({
        ScreenTitle: {
          x: (1920 - tx._source.renderInfo.w) / 2,
        },
      })
    })

    this._setState('AddButtonState')
  }

  _handleAddButtonClick() {
    const currentListSize = this._contentListTag.items.length
    const newSlides = Array.from(Array(this._slidesCount).keys())
      .map((value) => value + currentListSize)
      .map((value) => this._createCards(value))

    this._contentListTag.add(newSlides)
    this._contentListTag.reposition()
  }

  _handleClearButtonClick() {
    this._contentListTag.setIndex(0)
    this._contentListTag.clear()
  }

  _createCards(value) {
    return {
      type: ImageCard,
      w: 225,
      h: 400,
      imgUrl: `https://picsum.photos/225/400?v=${value}`,
      signals: {
        click: this._handleCardClick.bind(this, value),
      },
    }
  }

  _handleCardClick(value) {
    console.log(`card ${value} clicked`)
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

        _handleDown() {
          this._setState('AddButtonState')
        }
      },

      class AddButtonState extends this {
        _getFocused() {
          return this._addButtonTag
        }

        _handleUp() {
          this._setState('BackButtonState')
        }

        _handleRight() {
          this._setState('ClearButtonState')
        }

        _handleDown() {
          if (this._contentListTag.items && this._contentListTag.items.length > 0) {
            this._setState('ContentListState')
          }
        }
      },

      class ClearButtonState extends this {
        _getFocused() {
          return this._clearButtonTag
        }

        _handleUp() {
          this._setState('BackButtonState')
        }

        _handleLeft() {
          this._setState('AddButtonState')
        }

        _handleDown() {
          if (this._contentListTag.items && this._contentListTag.items.length > 0) {
            this._setState('ContentListState')
          }
        }
      },

      class ContentListState extends this {
        _getFocused() {
          return this._contentListTag
        }

        _handleUp() {
          this._setState('AddButtonState')
        }
      },
    ]
  }
}
