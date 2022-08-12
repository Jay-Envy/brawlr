import {Injectable} from '@angular/core';
import {FirebaseAuthentication} from '@capacitor-firebase/authentication';
import {Router} from '@angular/router';
import {Auth, signInWithCredential, signOut} from '@angular/fire/auth';
import {updateProfile, GoogleAuthProvider, PhoneAuthProvider, User} from 'firebase/auth';
import {Capacitor} from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: null | User = null;
  private verificationId: string;

  constructor(public auth: Auth, public router: Router) {
    this.auth.onAuthStateChanged(user => this.setCurrentUser(user));
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getProfilePic(): string {
    return this.currentUser && this.currentUser.photoURL ?
     this.currentUser.photoURL : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png';
  }

  getDisplayName(): string | undefined {
    return this.currentUser ? this.currentUser.displayName : undefined;
  }

  getEmail(): string | undefined {
    return this.currentUser ? this.currentUser.email : undefined;
  }

  getUserUID(): string | undefined {
    return this.currentUser ? this.currentUser.uid : undefined;
  }

  async signOut(): Promise<void> {
    await FirebaseAuthentication.signOut();

    if (Capacitor.isNativePlatform()) {
      await signOut(this.auth);
    }
  }

  async signInWithGoogle(): Promise<void> {
    // Sign in on the native layer.
    const {credential: {idToken, accessToken}} = await FirebaseAuthentication.signInWithGoogle();

    // Sign in on the web layer.
    // The plug-in only handles the native layer, for PWA this isn't a problem.
    // However, for native apps this is a problem, as the app is web-based.
    if (Capacitor.isNativePlatform()) {
      // A credential can be generated for each supported provider,
      // however, the signature of these methods is varied.
      // Make sure to check the Firebase JavaScript SDK docs to find the required parameters.
      // https://firebase.google.com/docs/auth/web/google-signin
      const credential = GoogleAuthProvider.credential(idToken, accessToken);
      await signInWithCredential(this.auth, credential);
    }
  }

  /**
   * The login process for a phone is seperated in 2 part.
   *  1. A Verification code is send to the user. <-- This method.
   *  2. The verification code is entered on the website and used to log in.
   *
   * @param phoneNumber The phone number to which the verification code must be send.
   */
  async sendPhoneVerificationCode(phoneNumber: string): Promise<void> {
    // The Plug-in doesn't support Phone authentication on PWA.
    // It can be implemented using the Firebase JavaScript SDK, but this requires
    // a lot of configuration in the Google Cloud Console, and falls outside the scope
    // of this course.
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    const {verificationId} = await FirebaseAuthentication.signInWithPhoneNumber({phoneNumber});
    this.verificationId = verificationId;
  }

  /**
   * Authenticate the user through the verification send to his phone number.
   *
   * @param verificationCode
   */
  async signInWithPhoneNumber(verificationCode: string): Promise<void> {
    // The Plug-in doesn't support Phone authentication on PWA.
    // It can be implemented using the Firebase JavaScript SDK, but this requires
    // a lot of configuration in the Google Cloud Console, and falls outside the scope
    // of this course.
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    // We can't log in through the plug-in here, we must either choose
    // authentication on the web layer, or on the native layer.
    // A verification code can only be used once.
    const credential = PhoneAuthProvider.credential(this.verificationId, verificationCode);
    await signInWithCredential(this.auth, credential);
  };

  async updateDisplayName(displayName: string): Promise<void> {
    await updateProfile(this.auth.currentUser, {
      displayName
    });
  }

  /**
   * Save the new user as an instance variable, and perform any necessary reroutes.
   *
   * @param user The new user.
   * @private
   */
  private async setCurrentUser(user: User): Promise<void> {
    this.currentUser = user;
    if (this.currentUser) {
      await this.router.navigate(['/']);
    } else {
      await this.router.navigate(['tabs/account']);
    }
  }
}
