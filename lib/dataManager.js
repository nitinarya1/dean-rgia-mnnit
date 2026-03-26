// localStorage-based CRUD utility for managing site data (frontend-only)

import {
  defaultPublications,
  defaultMous,
  defaultTeam,
  defaultSouvenirs,
  resourceGenerationContent,
} from "@/data/siteData";

const STORAGE_KEYS = {
  publications: "rgia_publications",
  mous: "rgia_mous",
  team: "rgia_team",
  souvenirs: "rgia_souvenirs",
  resourceGeneration: "rgia_resource_generation",
  initialized: "rgia_data_initialized",
};

// Initialize data from defaults on first load
export function initializeData() {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(STORAGE_KEYS.initialized)) return;

  localStorage.setItem(STORAGE_KEYS.publications, JSON.stringify(defaultPublications));
  localStorage.setItem(STORAGE_KEYS.mous, JSON.stringify(defaultMous));
  localStorage.setItem(STORAGE_KEYS.team, JSON.stringify(defaultTeam));
  localStorage.setItem(STORAGE_KEYS.souvenirs, JSON.stringify(defaultSouvenirs));
  localStorage.setItem(STORAGE_KEYS.resourceGeneration, JSON.stringify(resourceGenerationContent));
  localStorage.setItem(STORAGE_KEYS.initialized, "true");
}

// Get data by key
export function getData(key) {
  if (typeof window === "undefined") {
    // Return defaults during SSR
    const defaults = {
      publications: defaultPublications,
      mous: defaultMous,
      team: defaultTeam,
      souvenirs: defaultSouvenirs,
      resourceGeneration: resourceGenerationContent,
    };
    return defaults[key] || [];
  }
  initializeData();
  const data = localStorage.getItem(STORAGE_KEYS[key]);
  return data ? JSON.parse(data) : [];
}

// Set data by key
export function setData(key, value) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value));
}

// Add an item to a list
export function addItem(key, item) {
  const data = getData(key);
  const newId = data.length > 0 ? Math.max(...data.map((d) => d.id)) + 1 : 1;
  const newItem = { ...item, id: newId };
  data.push(newItem);
  setData(key, data);
  return newItem;
}

// Update an item by id
export function updateItem(key, id, updatedFields) {
  const data = getData(key);
  const index = data.findIndex((item) => item.id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedFields };
    setData(key, data);
    return data[index];
  }
  return null;
}

// Delete an item by id
export function deleteItem(key, id) {
  const data = getData(key);
  const filtered = data.filter((item) => item.id !== id);
  setData(key, filtered);
  return filtered;
}
