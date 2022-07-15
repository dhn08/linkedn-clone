import { atom } from "recoil";

export const modalState = atom({
  key: "modelState",
  default: false,
});

export const modalTypeState = atom({
  key: "modalTypeState",
  default: "dropIn",
});
