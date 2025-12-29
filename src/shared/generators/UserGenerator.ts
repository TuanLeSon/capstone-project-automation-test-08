/* =====================================================
src/shared/generator/UserGenerator.ts
===================================================== */
export type TestUser = {
    username: string;
    confirmPassword: string;
    email: string;
    password: string;
    fullName: string;
    phone: string;
};

export function generateUser(prefix = 'auto'): TestUser {
    const ts = Date.now();
    return {
        username: `${prefix}${ts}`,
        email: `${prefix}+${ts}@example.com`,
        password: `P@ssw0rd${String(ts).slice(-4)}`,
        confirmPassword: `P@ssw0rd${String(ts).slice(-4)}`,
        fullName: randomFullName(),
        phone: randomPhoneNumber()
    };
}

function randomFullName(): string {
    const names = [
      'An', 'Binh', 'Chi', 'Dung', 'Hieu', 'Khanh', 'Linh', 'Minh', 'Nam', 'Phong',
      'Quang', 'Son', 'Tuan', 'Vy', 'Yen', 'Hoa', 'Trang', 'My', 'Long', 'Hao'
    ];
  
    const first = names[Math.floor(Math.random() * names.length)];
    const last  = names[Math.floor(Math.random() * names.length)];
  
    return `${first} ${last}`; // kết quả: "Minh Son"
  }

  function randomPhoneNumber(): string {
    const prefixes = ['03', '05', '07', '08', '09'];  // đầu số di động VN phổ biến
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  
    let number = prefix;
    while (number.length < 10) {
      number += Math.floor(Math.random() * 10);  // add random digits
    }
    return number;
  }
  
  