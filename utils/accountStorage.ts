// utils/accountStorage.ts
import fs from "fs";

const FILE_PATH = "data/generatedAccount.json";

export function saveAccount(account: any) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(account, null, 2), "utf-8");
}

export function loadAccount() {
  if (!fs.existsSync(FILE_PATH)) {
    throw new Error("❌ No generated account found. Run sign-up test first.");
  }

  return JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
}

export function updateAccount(updates: any) {
  if (!fs.existsSync(FILE_PATH)) {
    throw new Error("❌ No account to update.");
  }

  const current = JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
  const updated = { ...current, ...updates };

  fs.writeFileSync(FILE_PATH, JSON.stringify(updated, null, 2), "utf-8");

  return updated;
}
