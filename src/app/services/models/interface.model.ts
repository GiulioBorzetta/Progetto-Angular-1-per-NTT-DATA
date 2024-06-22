export interface PeopleInfo {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: string;
}

export interface Comments {
    id: number;
    post_id: number;
    name: string;
    email: string;
    body: string;
}

export interface Posts {
    id: number;
    user_id: number;
    title: string;
    body: string;
    comments?: Comments[];
}

export interface User {
    id: number;
    name: string;
    email: string;
    gender: string
    status: string;
  }

export interface Todos {
    id: number;
    user_id: number;
    title: string;
    due_on: Date;
    status: string;
}