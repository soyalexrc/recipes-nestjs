import { IsString } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  title: string;

  @IsString()
  userId: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsString()
  estimatedTime: string;

  @IsString()
  amountOfPortions: string;

  @IsString()
  typeOfPortion: string;

  @IsString()
  image: string;

  @IsString()
  steps: string;

  @IsString()
  ingredients: string;

  @IsString()
  localId: string;
}
