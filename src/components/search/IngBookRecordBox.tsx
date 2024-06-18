import DateInput from './DateInput';

function IngBookRecordBox() {
  return (
    <div>
      <div>독서량</div>
      <div>쪽수 또는 %로 입력받기</div>
      <div>독서 기간</div>
      <DateInput labelText={'시작일'}></DateInput>
    </div>
  );
}

export default IngBookRecordBox;
