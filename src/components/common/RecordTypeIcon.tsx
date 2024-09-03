import { BookRecordType } from '../../shared/interfaces/book.interface';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import StarIcon from '@mui/icons-material/Star';
import { match } from 'ts-pattern';
import { IconSize } from '../../shared/interfaces/common.interface';

interface RecordTypeIconProps {
  recordType: BookRecordType | undefined;
  iconSize: IconSize;
}

function RecordTypeIcon({ recordType, iconSize = 'medium' }: RecordTypeIconProps) {
  return (
    <>
      {match(recordType)
        .with('already', () => <BookmarkIcon fontSize={iconSize} />)
        .with('ing', () => <AutoStoriesIcon fontSize={iconSize} />)
        .otherwise(() => (
          <StarIcon fontSize={iconSize} />
        ))}
    </>
  );
}

export default RecordTypeIcon;

// TODO: Header, Loading 컴포넌트 common안으로 넣기
