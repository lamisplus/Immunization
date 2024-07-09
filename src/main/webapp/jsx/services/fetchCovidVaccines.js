import axios from "axios";
import { token, url as baseUrl } from "../../api";

const vaccines = [
  {
    id: 27,
    name: "AstraZeneca",
    category: "VACCINE",
  },
  {
    id: 28,
    name: "Pfizer",
    category: "VACCINE",
  },
  {
    id: 29,
    name: "Moderna",
    category: "VACCINE",
  },
  {
    id: 30,
    name: "Janssen",
    category: "VACCINE",
  },
  {
    id: 31,
    name: "AZ",
    category: "VACCINE",
  },
  {
    id: 32,
    name: "Sinovac",
    category: "VACCINE",
  },
  {
    id: 33,
    name: "Sinopharm",
    category: "VACCINE",
  },
  {
    id: 34,
    name: "Bharat (Covaxin)",
    category: "VACCINE",
  },
  {
    id: 35,
    name: "Sputnik",
    category: "VACCINE",
  },
  {
    id: 36,
    name: "Other",
    category: "VACCINE",
  },
  {
    id: 37,
    name: "Johnson and Johnson",
    category: "VACCINE",
  },
];
export const fetchCovidVaccines = async (code) => {
  const response = await axios.get(`${baseUrl}covid/codeset?category=VACCINE`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return vaccines;
};
