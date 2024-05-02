import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace the existing storage import with AsyncStorage

// Replace the storage initialization with AsyncStorage
const storage = AsyncStorage;

// Update createUser function to store user data locally
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    await signIn(email, password);

    // Store user data locally using AsyncStorage
    await AsyncStorage.setItem('userData', JSON.stringify({
      accountId: newAccount.$id,
      email: email,
      username: username,
    }));

    return newAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Update getCurrentUser function to retrieve user data from local storage
export async function getCurrentUser() {
  try {
    const userData = await AsyncStorage.getItem('userData');

    if (!userData) throw Error;

    return JSON.parse(userData);
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Update signOut function to clear user data from local storage
export async function signOut() {
  try {
    // Clear user data from local storage
    await AsyncStorage.removeItem('userData');

    // Sign out from Appwrite
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}
