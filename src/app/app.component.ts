import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthProvider } from '../providers/auth/auth';
import { FirebaseProvider } from '../providers/firebase/firebase';

import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  activePage: any;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, afAuth: AngularFireAuth, public statusBar: StatusBar, public splashScreen: SplashScreen, 
    public firebaseProvider: FirebaseProvider, public authData: AuthProvider) {
    const authObserver = afAuth.authState.subscribe( user => {
      if (user) {
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      }
    });

    this.initializeApp();

    this.pages = [
      { title: "Home", component: HomePage }
    ];

    this.activePage = this.pages[0];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  logout() {
    this.authData.logoutUser();
    this.rootPage = LoginPage;
    this.nav.setRoot(LoginPage);
  }

  checkActive(page){
    return page = this.activePage;
  }

}
