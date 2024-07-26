import { defineStyle, defineStyleConfig } from '@chakra-ui/react';
import { ButtonOutline } from './classes/ButtonOutline';

// size
const md = defineStyle({
  boxSizing: 'border-box',
  fontWeight: 600,
  fontSize: '15px',
  lineHeight: '20px',
  px: '24px',
  py: '14px',
  borderRadius: '5px',
  height: '48px',
});

const mdIcon = defineStyle({
  boxSizing: 'border-box',
  px: '12px',
  py: '12px',
  borderRadius: '5px',
  width: '48px',
  height: '48px',

  svg: {
    fontSize: '24px',
  },
});

// theme
const solid = defineStyle({
  backgroundColor: 'brand.500',
  color: 'gray.0',

  _disabled: {
    opacity: 1,
    backgroundColor: 'gray.50',
    color: 'gray.0',
    pointerEvents: 'none',
  },

  _loading: {
    backgroundColor: 'brand.500',
    color: 'gray.0',
  },
});

const outline = defineStyle(new ButtonOutline('brand.500', 'brand.500').getOutlineTheme());

const outlineGray = defineStyle(new ButtonOutline('gray.50', 'gray.1000').getOutlineTheme());

const clear = defineStyle({
  backgroundColor: 'rbga(255, 255, 255, 0)',
  color: 'gray.0',

  _hover: {
    backgroundColor: 'rbga(255, 255, 255, 0)',
  },

  _disabled: {
    opacity: 1,
    backgroundColor: 'rbga(255, 255, 255, 0)',
    color: 'gray.300',
    pointerEvents: 'none',
  },

  _loading: {
    backgroundColor: 'rbga(255, 255, 255, 0)',
    color: 'gray.300',
  },
});

export const buttonTheme = defineStyleConfig({
  sizes: { md, mdIcon },
  variants: { solid, outline, outlineGray, clear },
  defaultProps: {
    size: 'md',
    variant: 'solid',
    colorScheme: 'brand',
  },
});
