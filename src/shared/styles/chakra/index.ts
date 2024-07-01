import { extendTheme } from '@chakra-ui/react';
import { modalTheme } from './components/modal';

export const theme = extendTheme({
  components: { Modal: modalTheme },
});
