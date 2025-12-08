// utils/accountGenerator.ts

// Vietnamese sample name lists
const firstNames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Vũ"];
const middleNames = ["Văn", "Thị", "Hữu", "Minh", "Ngọc"];
const lastNames = ["An", "Huy", "Dũng", "Lan", "Mai", "Phúc", "Trang"];

function randomItem(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Generate fullname (Vietnamese format)
export function generateFullName(): string {
  return `${randomItem(firstNames)} ${randomItem(middleNames)} ${randomItem(lastNames)}`;
}

export function generateUsername(): string {
  return `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

export function generateEmail(): string {
  return `user${Date.now()}${Math.floor(Math.random() * 999)}@test.com`;
}

export function generatePassword(): string {
  return `P@ss${Math.floor(Math.random() * 9000) + 1000}`;
}

export function generatePhone(): string {
  return `09${Math.floor(Math.random() * 90000000 + 10000000)}`;
}

export function generateAccount() {
  return {
    fullName: generateFullName(),
    username: generateUsername(),
    email: generateEmail(),
    password: generatePassword(),
    phone: generatePhone(),
  };
}
