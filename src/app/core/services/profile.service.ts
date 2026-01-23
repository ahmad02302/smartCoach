import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserDatabaseService } from './user-database.service';

export interface AthleteProfile {
  firstName: string;
  lastName: string;
  shortName: string;
  image: string;
  interests: string[];
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly PROFILE_STORAGE_KEY = 'smartCoach_profile_';

  constructor(
    private authService: AuthService,
    private userDb: UserDatabaseService
  ) {}

  getProfile(): AthleteProfile {
    const user = this.authService.getCurrentUser();
    if (!user) {
      return this.getDefaultProfile();
    }

    const storedProfile = localStorage.getItem(this.PROFILE_STORAGE_KEY + user.id);
    if (storedProfile) {
      return JSON.parse(storedProfile);
    }

    // Create profile from user data
    const profile: AthleteProfile = {
      firstName: user.firstName,
      lastName: user.lastName,
      shortName: `${user.firstName} ${user.lastName}`,
      image: 'https://static.vecteezy.com/system/resources/previews/009/398/577/original/man-avatar-clipart-illustration-free-png.png',
      interests: ['fitness', 'cardio']
    };

    this.updateProfile(profile);
    return profile;
  }

  updateProfile(profile: AthleteProfile) {
    const user = this.authService.getCurrentUser();
    if (user) {
      localStorage.setItem(this.PROFILE_STORAGE_KEY + user.id, JSON.stringify(profile));
    }
  }

  private getDefaultProfile(): AthleteProfile {
    return {
      firstName: '',
      lastName: '',
      shortName: '',
      image: 'https://static.vecteezy.com/system/resources/previews/009/398/577/original/man-avatar-clipart-illustration-free-png.png',
      interests: []
    };
  }
}
