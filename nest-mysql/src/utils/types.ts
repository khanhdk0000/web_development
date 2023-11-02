export type CreateUserParam = {
  username: string;
  password: string;
};

export type UpdateUserParam = {
  username: string;
  password: string;
};

export type UserProfilParam = {
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
};

export type CreatePostParam = {
  title: string;
  description: string;
};
