import { useRef, useEffect } from 'react';

// Generate 15-minute time slots from 00:00 to 23:45 (96 slots)
export const TIME_SLOTS_15 = [];
for (let h = 0; h < 24; h++) {
  for (let m = 0; m < 60; m += 15) {
    const hh = h.toString().padStart(2, '0');
    const mm = m.toString().padStart(2, '0');
    TIME_SLOTS_15.push(`${hh}:${mm}`);
  }
}

export const TimePickerWindow = ({
  selectedTime = '10:00',
  onSelectTime,
  onClose
}) => {
  const listRef = useRef(null);

  // Auto-scroll to selected time when the window opens
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('[data-selected="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'center', behavior: 'auto' });
      }
    }
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 select-none animate-in fade-in zoom-in-95 duration-150 relative z-[100] w-full sm:w-[620px]">
      {/* Top Header Label */}
      <div className="text-center pb-3">
        <span className="text-xs font-semibold text-gray-400 tracking-wider">
          Open
        </span>
      </div>

      {/* 5-Item Visible Scroll Container */}
      <div
        ref={listRef}
        className="overflow-y-auto max-h-[275px] py-1 flex flex-col items-center gap-2.5 custom-green-scrollbar"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#16a34a #f1f5f9'
        }}
      >
        {TIME_SLOTS_15.map((time) => {
          const isSelected = selectedTime === time;
          return (
            <button
              key={time}
              type="button"
              data-selected={isSelected}
              onClick={() => {
                onSelectTime(time);
                if (onClose) onClose();
              }}
              className={`w-44 py-2.5 px-6 rounded-lg text-sm font-semibold border transition-all duration-150 cursor-pointer text-center ${
                isSelected
                  ? 'border-green-600 bg-green-700 text-white shadow-sm'
                  : 'border-gray-200 text-gray-800 hover:border-green-600 hover:bg-green-50 hover:text-green-800'
              }`}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
};
