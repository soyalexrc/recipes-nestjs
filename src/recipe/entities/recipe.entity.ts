import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  localId: string;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column()
  description: string;

  @Column()
  estimatedTime: string;

  @Column()
  typeOfPortion: string;

  @Column()
  amountOfPortions: string;

  @Column()
  userId: string;

  @Column()
  image: string;

  @Column()
  steps: string;

  @Column()
  ingredients: string;
}
