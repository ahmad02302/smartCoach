import { Injectable } from '@angular/core';

export interface User {
  id: string;
  email: string;
  password: string; // In production, this should be hashed
  firstName: string;
  lastName: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class UserDatabaseService {
  private readonly DB_KEY = 'smartCoach_users';
  private readonly CURRENT_USER_KEY = 'smartCoach_current_user';

  constructor() {
    this.initializeDatabase();
  }

  private initializeDatabase(): void {
    const users = this.getUsers();
    if (!users || users.length === 0) {
      // Initialize with empty array
      localStorage.setItem(this.DB_KEY, JSON.stringify([]));
    }
  }

  private getUsers(): User[] {
    const usersJson = localStorage.getItem(this.DB_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(this.DB_KEY, JSON.stringify(users));
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const users = this.getUsers();
    
    // Check if user already exists
    if (users.some(u => u.email === userData.email)) {
      throw new Error('User with this email already exists');
    }

    const newUser: User = {
      ...userData,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const users = this.getUsers();
    return users.find(u => u.email === email) || null;
  }

  async getUserById(id: string): Promise<User | null> {
    const users = this.getUsers();
    return users.find(u => u.id === id) || null;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === id);
    
    if (index === -1) {
      throw new Error('User not found');
    }

    users[index] = { ...users[index], ...updates };
    this.saveUsers(users);
    return users[index];
  }

  async deleteUser(id: string): Promise<void> {
    const users = this.getUsers();
    const filteredUsers = users.filter(u => u.id !== id);
    this.saveUsers(filteredUsers);
  }

  setCurrentUser(userId: string | null): void {
    if (userId) {
      localStorage.setItem(this.CURRENT_USER_KEY, userId);
    } else {
      localStorage.removeItem(this.CURRENT_USER_KEY);
    }
  }

  getCurrentUserId(): string | null {
    return localStorage.getItem(this.CURRENT_USER_KEY);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
