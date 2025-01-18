import { Account, Avatars, Client, Databases, ID, Query, QueryTypesList } from 'react-native-appwrite';


export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.ss.sketchy",
    projectId: "6772c4d1002439c66d02",
    storageId: "6772ebbf00080dee3ca7",
    databaseId: "6772e9b6002b26e789a0",
    userCollectionId: "6772e9ee0011be5e79c2",
    videoCollectionId: "6772ea1500046ad8e9d1",
};

const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)
    ;



const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);


export async function createUser(email: string, password: string, username: string): Promise<Object> {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );


        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        );

        return newUser;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function signIn(email: string, password: string) {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error: any) {
        throw new Error(error);
    }
}




export async function getAccount() {
    try {
        const currentAccount = await account.get();
        return currentAccount;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount();
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        return null;
    }
}

export async function getAllPosts() {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId
        );

        if (!posts) throw Error;

        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getLatestPost() {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc("$createdAt"), Query.limit(7)]
        )
        if (!posts) throw Error;
        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function signOut() {
    try {
        const session = await account.deleteSession("current");

        return session;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function searchPosts(query: any) {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.search("title", query)]
        );

        if (!posts) throw new Error("Something went wrong");

        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getUserPosts(userId:any) {
    console.log(userId)
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.equal("user", userId)]
        );
        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
}



