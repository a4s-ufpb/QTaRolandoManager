import { Time } from '@angular/common';
import { Category } from './Category';
export interface EventModel {
  id?: number;
  title: string;
  subtitle: string;
  categories: Category[];
  description: string;
  initialDate: Date;
  finalDate: Date;
  imagePath: string;
  modality: string;
  location?: string;
  phone?: string;
  site?: string;
}
