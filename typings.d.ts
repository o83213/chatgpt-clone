interface Message {
  _id?: string;
  text: string;
  createdAt?: string;
  updatedAt?: string;
  author: {
    email: string;
    name: string;
    avatar: string;
  };
}

interface Chat {
  _id: string;
  userEmail: string;
  messages: Message[];
  createdAt?: string;
  updatedAt?: string;
}
