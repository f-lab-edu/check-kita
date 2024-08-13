export class ButtonOutline {
  borderColor: string;
  textColor: string;

  constructor(borderColor: string, textColor: string) {
    this.borderColor = borderColor;
    this.textColor = textColor;
  }

  getOutlineTheme() {
    return {
      border: '2px solid',
      borderColor: this.borderColor,
      backgroundColor: 'transparnt',
      color: this.textColor,

      _hover: {
        backgroundColor: 'rgba(0,0,0,0.4)',
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
