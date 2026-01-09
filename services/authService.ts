import {
  initializeApp,
  FirebaseApp,
} from "firebase/app";
import {
  getAuth,
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  getDatabase,
  Database,
  ref,
  set,
  get,
  update,
} from "firebase/database";

// Firebase config (será preenchido com variáveis de ambiente)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: `https://${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseio.com`,
};

let app: FirebaseApp;
let auth: Auth;
let database: Database;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  database = getDatabase(app);
} catch (error) {
  console.error("Erro ao inicializar Firebase:", error);
}

interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  persona?: "ugc" | "influencer" | "viral" | "seller";
  createdAt: number;
  updatedAt: number;
}

class AuthService {
  async register(email: string, password: string, displayName: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Salvar perfil no Realtime Database
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email || "",
        displayName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      await set(ref(database, `users/${user.uid}`), userProfile);

      return user;
    } catch (error) {
      console.error("Erro ao registrar:", error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw error;
    }
  }

  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
  }

  async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const snapshot = await get(ref(database, `users/${uid}`));
      return snapshot.val();
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
      return null;
    }
  }

  async updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
    try {
      await update(ref(database, `users/${uid}`), {
        ...updates,
        updatedAt: Date.now(),
      });
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      throw error;
    }
  }

  async saveUserData(uid: string, dataType: string, data: any): Promise<void> {
    try {
      await set(ref(database, `users/${uid}/${dataType}`), {
        ...data,
        updatedAt: Date.now(),
      });
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      throw error;
    }
  }

  async getUserData(uid: string, dataType: string): Promise<any> {
    try {
      const snapshot = await get(ref(database, `users/${uid}/${dataType}`));
      return snapshot.val();
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      return null;
    }
  }

  getCurrentUser(): User | null {
    return auth.currentUser;
  }
}

export const authService = new AuthService();
export { auth, database };
