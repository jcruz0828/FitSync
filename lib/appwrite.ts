import { Account, Avatars, Client, Databases, ID, Query,Storage } from 'react-native-appwrite';
import Constants from "expo-constants";



type UserCreateInput = {
    email:string;
    password:string;
    username:string;
    name:string;
}

type SignInInput = {
    email:string;
    password:string;
}
type ExtraConfig = {
  APPWRITE_ENDPOINT: string;
  APPWRITE_PLATFORM: string;
  APPWRITE_PROJECT: string;
  APPWRITE_USER: string;
  APPWRITE_DB: string;
};

const extra = Constants.expoConfig?.extra as ExtraConfig;
const client = new Client();
export const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client)
const {
  APPWRITE_ENDPOINT,
  APPWRITE_PLATFORM,
  APPWRITE_PROJECT,
  APPWRITE_USER,
  APPWRITE_DB,
} = extra;

client
    .setEndpoint(APPWRITE_ENDPOINT!) // Your Appwrite Endpoint
    .setProject(APPWRITE_PROJECT!) // Your project ID
    .setPlatform(APPWRITE_PLATFORM!) // Your application ID or bundle ID.
;

export const createUser = async ({ email, password, username, name }: UserCreateInput) => {
  try {
      const newAccount = await account.create(ID.unique(), email, password, username);

      if (!newAccount) throw new Error("Account creation failed.");

      const avatarUrl = avatars.getInitials(username);

      await signIn({ email, password });

      const newUser = await databases.createDocument(
          APPWRITE_DB!,
          APPWRITE_USER!,
          ID.unique(),
          {
              accountId: newAccount.$id,
              name,
              email,
              username,
              avatar: avatarUrl,
          }
      );

      return newUser;
  } catch (error: any) {
      console.error("Error creating user:", error.message);
      throw new Error("Failed to create user. Please try again.");
  }
};


export const signIn = async ({ email, password }: SignInInput) => {
  try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
  } catch (error: any) {
      console.error("Sign-in error:", error.message);
      throw new Error(error.message || "Invalid email or password. Please try again.");
  }
};


export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if(!currentAccount)throw new Error('no current account');

    const currentUser = await databases.listDocuments(APPWRITE_DB,APPWRITE_USER!,[Query.equal('accountId',currentAccount.$id)])

    if(!currentUser) throw new Error('no current user');

    return currentUser.documents[0];

  } catch (error) {
    console.log(error)
  }
}

export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error:any) {
    throw new Error(error);
  }
}
