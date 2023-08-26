interface Message {
  text: string;
  createdAt: string;
  updatedAt: string;
  author: {
    _id: string;
    name: string;
    avatar: string;
  };
}
