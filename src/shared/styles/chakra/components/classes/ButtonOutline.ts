export class ButtonOutline {
  borderColor: string;
  textColor: string;

  constructor(borderColor: string, textColor: string) {
    this.borderColor = borderColor;
    this.textColor = textColor;
  }

  getOutlineTheme() {
    return {
      border: '1px solid',
      borderColor: this.borderColor,
      backgroundColor: 'gray.0',
      color: this.textColor,

      _hover: {
        backgroundColor: '#F5F5F5',
      },

      _disabled: {
        opacity: 1,
        borderColor: 'gray.50',
        backgroundColor: 'gray.0',
        color: 'gray.300',
        pointerEvents: 'none',
      },

      _loading: {
        borderColor: this.borderColor,
        backgroundColor: 'gray.0',
        color: 'gray.300',
      },
    };
  }
}
