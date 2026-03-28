import xlsx from "xlsx";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { sendPasswordMail } from "./mailService.js";
import { generatePassword } from "../utils/generatePassword.js";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function importUsers(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  for (const row of data) {
    const rawPassword = generatePassword(16);
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const user = new User({
      username: row.username,
      email: row.email,
      password: hashedPassword,
      role: "user"
    });

    await user.save();

    await sendPasswordMail(row.email, rawPassword);

    console.log(`Created: ${row.username}`);

    await sleep(3000);
  }
}