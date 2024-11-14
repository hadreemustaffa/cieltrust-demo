export const LOCAL_STORAGE_KEY = "cieltrust-users";

export const DEMO_ACCOUNT = {
  id: 0,
  email: "demo@account.com",
  password: "demoaccount",
  firstName: "Demo",
  lastName: "Account",
  balanceSummary: {
    checking: 0,
    savings: 0,
  },
};

export const EMAIL_REGEX =
  /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i;
