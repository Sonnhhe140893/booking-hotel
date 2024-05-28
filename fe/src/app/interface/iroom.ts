export interface IRoom {
  _id: string;
  name: string;
  avatar: string;
  status: boolean;
  price: number;
  category_id: string;
  size: number;
  bed: number;
  description: string;
  room_content: string;
  category: string;
  albums: [];
  created_at: string;

}
