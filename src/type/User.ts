
export interface IFirebaseUser {
    providerId: string;  // The provider that authenticated the user (e.g., 'google.com')
    uid: string;         // Unique identifier for the user
    displayName: string; // The user's display name
    email: string;       // The user's email address
    phoneNumber: string | null; // The user's phone number (can be null if not provided)
    photoURL: string;    // The URL of the user's profile photo
}
