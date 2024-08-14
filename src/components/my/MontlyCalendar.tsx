import { useState } from 'react';
import Calendar from 'react-calendar';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function MontlyCalendar() {
  const TODAY = new Date();
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        defaultActiveStartDate={TODAY}
        showNavigation={false}
      />
    </div>
  );
}

export default MontlyCalendar;
