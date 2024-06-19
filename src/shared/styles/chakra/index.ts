import { extendTheme } from '@chakra-ui/react';
import { modalTheme } from './components/modal';
import { colors } from './variables/colors';
import { fontSizes } from './variables/fontSizes';

export const theme = extendTheme({
  colors: colors,
  fontSizes: fontSizes,
  components: { Modal: modalTheme },
});
