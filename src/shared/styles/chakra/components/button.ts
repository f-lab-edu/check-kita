import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

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

const outline = defineStyle({
  border: '1px solid',
  borderColor: 'brand.500',
  backgroundColor: 'gray.0',
  color: 'brand.500',

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
    borderColor: 'brand.500',
    backgroundColor: 'gray.0',
    color: 'gray.300',
  },
});

const outlineGray = defineStyle({
  border: '1px solid',
  borderColor: 'gray.50',
  backgroundColor: 'gray.0',
  color: 'gray.1000',

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
    borderColor: 'gray.50',
    backgroundColor: 'gray.0',
    color: 'gray.300',
  },
});

const clear = defineStyle({
  backgroundColor: 'gray.0',
  color: 'gray.1000',

  _hover: {
    backgroundColor: '#F5F5F5',
  },

  _disabled: {
    opacity: 1,
    backgroundColor: 'gray.0',
    color: 'gray.300',
    pointerEvents: 'none',
  },

  _loading: {
    backgroundColor: 'gray.0',
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
