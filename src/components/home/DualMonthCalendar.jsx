import { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameDay, 
  isBefore, 
  startOfDay, 
  isAfter 
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const DualMonthCalendar = ({
  pickupDate,
  returnDate,
  onSelectPickupDate,
  onSelectReturnDate,
  activeField = 'pickup', // 'pickup' | 'return'
  setActiveField,
  onClose
}) => {
  // Current view base month (left month)
  const [currentMonth, setCurrentMonth] = useState(() => {
    return pickupDate ? startOfMonth(pickupDate) : startOfMonth(new Date());
  });

  const nextMonth = addMonths(currentMonth, 1);
  const today = startOfDay(new Date());

  const handlePrevMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };

  const handleDateClick = (day) => {
    if (isBefore(day, today)) return;

    if (activeField === 'pickup') {
      onSelectPickupDate(day);
      // Automatically switch focus to return date selection
      if (returnDate && isBefore(returnDate, day)) {
        onSelectReturnDate(addMonths(day, 0)); // reset or adjust
      }
      if (setActiveField) {
        setActiveField('return');
      }
    } else {
      // return date selection
      if (pickupDate && isBefore(day, pickupDate)) {
        // If clicked date is before pickup, make it the new pickup
        onSelectPickupDate(day);
        if (setActiveField) {
          setActiveField('return');
        }
      } else {
        onSelectReturnDate(day);
        if (onClose) {
          onClose();
        }
      }
    }
  };

  // Helper to render a month grid
  const renderMonth = (monthDate, isLeftMonth) => {
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Calculate Monday-based offset (0 for Mon, 6 for Sun)
    const startDayIndex = (monthStart.getDay() + 6) % 7;
    const blankDays = Array.from({ length: startDayIndex });

    return (
      <div className="flex-1 px-4 py-2 min-w-[280px]">
        {/* Month Header */}
        <div className="flex items-center justify-between mb-4 h-8">
          {isLeftMonth ? (
            <button
              type="button"
              onClick={handlePrevMonth}
              disabled={isBefore(monthStart, today)}
              className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-5" />
          )}

          <h3 className="font-bold text-gray-900 text-sm tracking-wide">
            {format(monthDate, 'MMMM yyyy')}
          </h3>

          {!isLeftMonth ? (
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-5" />
          )}
        </div>

        {/* Weekday Header (MON TUE WED THU FRI SAT SUN) */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {WEEKDAYS.map((wd) => (
            <span key={wd} className="text-[11px] font-semibold text-gray-500 tracking-wider">
              {wd}
            </span>
          ))}
        </div>

        {/* Calendar Day Matrix */}
        <div className="grid grid-cols-7 gap-y-1 gap-x-0 text-center">
          {blankDays.map((_, i) => (
            <div key={`blank-${i}`} className="h-9" />
          ))}

          {daysInMonth.map((day) => {
            const isPast = isBefore(day, today);
            const isPickup = pickupDate && isSameDay(day, pickupDate);
            const isReturn = returnDate && isSameDay(day, returnDate);
            const isInRange = pickupDate && returnDate && isAfter(day, pickupDate) && isBefore(day, returnDate);
            const dayNumberStr = format(day, 'dd');

            let containerBg = '';
            if (isInRange) {
              containerBg = 'bg-[#e8f8ec]';
            } else if (isPickup && returnDate && !isSameDay(pickupDate, returnDate)) {
              containerBg = 'bg-linear-to-r from-transparent 50% to-[#e8f8ec] 50%';
            } else if (isReturn && pickupDate && !isSameDay(pickupDate, returnDate)) {
              containerBg = 'bg-linear-to-l from-transparent 50% to-[#e8f8ec] 50%';
            }

            return (
              <div key={day.toISOString()} className={`h-9 flex items-center justify-center relative ${containerBg}`}>
                <button
                  type="button"
                  onClick={() => handleDateClick(day)}
                  disabled={isPast}
                  className={`w-8 h-8 flex items-center justify-center text-xs font-semibold rounded-md transition-all ${
                    isPickup || isReturn
                      ? 'bg-[#15803d] text-white font-bold shadow-sm z-10'
                      : isInRange
                      ? 'text-gray-900 hover:bg-green-200'
                      : isPast
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer'
                  }`}
                >
                  {dayNumberStr}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 pb-6 select-none animate-in fade-in zoom-in-95 duration-150 relative z-[100]">
      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100 gap-2 md:gap-0">
        {renderMonth(currentMonth, true)}
        {renderMonth(nextMonth, false)}
      </div>
    </div>
  );
};
