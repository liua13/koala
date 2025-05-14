// User types
export interface User {
  id: string;
  name?: string;
  phone: string;
  avatar?: string;
}

// Book status
export type BookStatus = 'available' | 'borrowed' | 'on_hold';

// Book type
export interface Book {
  id: string;
  title: string;
  author: string;
  status: BookStatus;
  coverUrl?: string;
  borrower?: User;
  holder?: User;
  owner: User;
  addedAt: Date;
  updatedAt: Date;
}

// Activity types
export type ActivityType = 'borrow' | 'return' | 'add_book' | 'new_friend';

// Activity
export interface Activity {
  id: string;
  type: ActivityType;
  user: User;
  book?: Book;
  friendFrom?: User;
  friendTo?: User;
  newFriend?: User;
  timestamp: Date;
}

// Library
export interface Library {
  id: string;
  owner: User;
  books: Book[];
  location?: {
    latitude: number;
    longitude: number;
  };
  allowFriendsOfFriends: boolean;
  createdAt: Date;
  updatedAt: Date;
}