import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  overlay: {
    bg: 'blackAlpha.200',
  },
  dialog: {
    borderRadius: '20px',
    bg: `#fff`,
    minWidth: '500px',
    maxWidth: '500px',
    padding: '10px',
  },
  header: {
    padding: '10px 20px',
  },
  body: {
    padding: '10px 20px',
  },
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
});
