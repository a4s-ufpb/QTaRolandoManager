export interface EventModel {
  id?: number;
  title: string;
  subtitle: string;
  categoryId: number;
  description: string;
  initialDate: Date;
  finalDate: Date;
  imagePath: string;
  eventModalityId: number;
  location: string;
  phone: string;
  site: string;
}
