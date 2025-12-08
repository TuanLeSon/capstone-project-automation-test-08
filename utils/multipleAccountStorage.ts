// utils/multiAccountStorage.ts
import fs from "fs";

const FILE_PATH = "data/accounts.json";

// Ensure file exists
function ensureFile() {
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, "[]", "utf-8");
  }
}

export function saveNewAccount(account: any) {
  ensureFile();
  const accounts = JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));

  accounts.push(account);

  fs.writeFileSync(FILE_PATH, JSON.stringify(accounts, null, 2), "utf-8");

  return account;
}

export function loadAllAccounts() {
  ensureFile();
  return JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
}

export function loadAccountByIndex(index: number) {
  const accounts = loadAllAccounts();
  if (!accounts[index]) throw new Error(`No account at index ${index}`);
  return accounts[index];
}

export function loadAccountByUsername(username: string) {
  const accounts = loadAllAccounts();
  return accounts.find((a: any) => a.username === username);
}

export function updateAccount(username: string, updates: any) {
  const accounts = loadAllAccounts();

  const index = accounts.findIndex((a: any) => a.username === username);
  if (index === -1) throw new Error(`Account ${username} not found`);

  accounts[index] = { ...accounts[index], ...updates };

  fs.writeFileSync(FILE_PATH, JSON.stringify(accounts, null, 2), "utf-8");

  return accounts[index];
}

export function deleteAccount(username: string) {
  const accounts = loadAllAccounts();
  const filtered = accounts.filter((a: any) => a.username !== username);

  fs.writeFileSync(FILE_PATH, JSON.stringify(filtered, null, 2), "utf-8");
}
