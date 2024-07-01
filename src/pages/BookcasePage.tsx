import { Button } from '@chakra-ui/react';
import AddIcon from '@mui/icons-material/Add';

function BookcasePage() {
  return (
    <div>
      책장 페이지 - 스크롤 인터랙티브로 변경
      <div>
        <Button>Button</Button>
        <Button isDisabled={true}>Button</Button>
        <Button isLoading={true}>Button</Button>
      </div>
      <div>
        <Button variant="outline">Button</Button>
        <Button variant="outline" isDisabled={true}>
          Button
        </Button>
        <Button variant="outline" isLoading={true}>
          Button
        </Button>
      </div>
      <div>
        <Button variant="outlineGray">Button</Button>
        <Button variant="outlineGray" isDisabled={true}>
          Button
        </Button>
        <Button variant="outlineGray" isLoading={true}>
          Button
        </Button>
      </div>
      <div>
        <Button variant="outlineGray" size="mdIcon">
          <AddIcon />
        </Button>
        <Button variant="outlineGray" size="mdIcon" isDisabled={true}>
          <AddIcon />
        </Button>
        <Button variant="outlineGray" size="mdIcon" isLoading={true}>
          <AddIcon />
        </Button>
      </div>
      <div>
        <Button variant="clear" size="mdIcon">
          <AddIcon />
        </Button>
        <Button variant="clear" size="mdIcon" isDisabled={true}>
          <AddIcon />
        </Button>
        <Button variant="clear" size="mdIcon" isLoading={true}>
          <AddIcon />
        </Button>
      </div>
    </div>
  );
}

export default BookcasePage;
