import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { Repository } from 'typeorm';
import { GenericResult } from '../common/interfaces';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}
  async create(
    createRecipeDto: CreateRecipeDto,
  ): Promise<GenericResult<Recipe>> {
    try {
      const recipe = this.recipeRepository.create(createRecipeDto);
      const data = await this.recipeRepository.save(recipe);
      return {
        data,
        error: null,
        message: 'Se publico la receta con exito!',
      };
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<GenericResult<Recipe[]>> {
    try {
      const data = await this.recipeRepository.find();
      return { data, error: null };
    } catch (error) {
      console.log(error);
    }
  }
  async findByUserId(id: string): Promise<GenericResult<Recipe[] | []>> {
    try {
      // TODO validate if the user exists;
      const data = await this.recipeRepository.find({
        where: { userId: id },
      });
      return { data, error: null };
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string): Promise<GenericResult<Recipe | null>> {
    try {
      const recipe = await this.recipeRepository.findOneBy({ id });

      if (!recipe) {
        return {
          data: null,
          error: true,
          message: `No se encontro una receta con el id: ${id}`,
        };
      }

      return { data: recipe, error: null };
    } catch (error) {
      console.log(error);
    }
  }

  async update(
    id: string,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<GenericResult<Recipe | []>> {
    try {
      let recipe = await this.recipeRepository.findOneBy({ id });

      if (!recipe) {
        return {
          data: [],
          error: true,
          message: `No se encontro una receta con el id: ${id}`,
        };
      }

      recipe = {
        ...recipe,
        ...updateRecipeDto,
      };

      const data = await this.recipeRepository.save(recipe);
      return {
        data,
        error: null,
        message: 'Se actualizo la receta con exito!',
      };
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string): Promise<GenericResult<any>> {
    try {
      const recipe = await this.recipeRepository.findOneBy({ id });

      if (!recipe) {
        return {
          data: [],
          error: true,
          message: `No se encontro una receta con el id: ${id}`,
        };
      }

      const data = await this.recipeRepository.remove(recipe);

      return {
        data,
        error: null,
        message: 'Se elimino la receta con exito!',
      };
    } catch (error) {
      console.log(error);
    }
  }
}
