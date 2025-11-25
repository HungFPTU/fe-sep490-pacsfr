export const validateShiftDateRequired = (value: string | undefined): string | undefined => {
  if (!value) {
    return 'Ngày làm việc là bắt buộc';
  }
  return undefined;
};

/**
 * KHÔNG ĐƯỢC TẠO WORKSHIFT VỚI NHỮNG NGÀY TRONG QUÁ KHỨ
 */
export const validateShiftDateNotPast = (value: string | undefined): string | undefined => {
  if (!value) {
    return undefined; 
  }

  const selectedDate = new Date(value);
  const today = new Date();
  
  
  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    return 'Không được tạo ca làm việc với ngày trong quá khứ';
  }

  return undefined;
};

/**
 * Cái này đảm bảo ngày làm việc không được trong quá khứ
 */
export const validateShiftDate = (value: string | undefined): string | undefined => {
  const requiredError = validateShiftDateRequired(value);
  if (requiredError) {
    return requiredError;
  }
  return validateShiftDateNotPast(value);
};


export const validateStartTimeRequired = (value: string | undefined): string | undefined => {
  if (!value) {
    return 'Giờ bắt đầu là bắt buộc';
  }
  return undefined;
};


export const validateEndTimeRequired = (value: string | undefined): string | undefined => {
  if (!value) {
    return 'Giờ kết thúc là bắt buộc';
  }
  return undefined;
};


export const validateShiftTypeRequired = (value: string | undefined): string | undefined => {
  if (!value) {
    return 'Loại ca là bắt buộc';
  }
  return undefined;
};


export const validateShiftTypeNotEmpty = (value: string | undefined): string | undefined => {
  if (!value?.trim()) {
    return 'Vui lòng nhập tên ca';
  }
  return undefined;
};


export const validateStartTimeNotEmpty = (value: string | undefined): string | undefined => {
  if (!value?.trim()) {
    return 'Vui lòng nhập giờ bắt đầu';
  }
  return undefined;
};


export const validateEndTimeNotEmpty = (value: string | undefined): string | undefined => {
  if (!value?.trim()) {
    return 'Vui lòng nhập giờ kết thúc';
  }
  return undefined;
};


export const validateEndTimeAfterStartTime = (
  startTime: string | undefined,
  endTime: string | undefined
): string | undefined => {
  if (!startTime || !endTime) {
    return undefined; 
  }

  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);

  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;

  if (endTotalMinutes <= startTotalMinutes) {
    return 'Giờ kết thúc phải sau giờ bắt đầu';
  }

  return undefined;
};

