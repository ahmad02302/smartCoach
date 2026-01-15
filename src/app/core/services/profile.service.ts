import { Injectable } from '@angular/core';
export interface AthleteProfile {
  firstName: string;
  lastName: string;
  shortName: string;
  image: string;
  interests: string[];
}

@Injectable({ providedIn: 'root' })
export class ProfileService {

  private profile: AthleteProfile = {
    firstName: 'Imed',
    lastName: 'Arfaoui', 
    shortName: 'Sportsman',
    image: 'https://static.vecteezy.com/system/resources/previews/009/398/577/original/man-avatar-clipart-illustration-free-png.png',
    interests: ['fitness', 'cardio']
  };

  getProfile(): AthleteProfile {
    return this.profile;
  }

  updateProfile(profile: AthleteProfile) {
    this.profile = profile;
  }
}
