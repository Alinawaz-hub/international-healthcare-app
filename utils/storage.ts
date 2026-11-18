import { signIn, signOut, getSession } from "@/lib/auth-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
/**
 * Save data to AsyncStorage
 * @param key - The key to store data under.
 * @param value - The value to store (will be converted to JSON).
 */
export const storeData = async (key: string, value: unknown): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log(`Data stored successfully under key: ${key}`);
  } catch (error) {
    console.error(`Error storing data under key: ${key}`, error);
  }
};
/**
 * Retrieve data from AsyncStorage
 * @param key - The key to retrieve data from.
 * @returns The retrieved value or null if not found or parsing fails.
 */
export const getData = async <T = unknown>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
  } catch (error) {
    console.error(`Error retrieving data for key: ${key}`, error);
    return null;
  }
};
/**
 * Remove data from AsyncStorage
 * @param key - The key to remove data from.
 */
export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Data removed successfully for key: ${key}`);
  } catch (error) {
    console.error(`Error removing data for key: ${key}`, error);
  }
};
/**
 * Clear all AsyncStorage data
 */
export const clearStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
    console.log("All data cleared from AsyncStorage");
  } catch (error) {
    console.error("Error clearing AsyncStorage", error);
  }
};
/**
 * Merge data into AsyncStorage (update specific properties)
 * @param key - The key to merge data for.
 * @param value - The object to merge into the existing data.
 */
export const mergeData = async (
  key: string,
  value: Record<string, any>
): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.mergeItem(key, jsonValue);
    console.log(`Data merged successfully under key: ${key}`);
  } catch (error) {
    console.error(`Error merging data for key: ${key}`, error);
  }
};
