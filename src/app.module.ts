import { Module } from '@nestjs/common';
import { RecipeModule } from './recipe/recipe.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe/entities/recipe.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'monorail.proxy.rlwy.net',
      port: 33153,
      username: 'root',
      password: 'g-31HgBcbb42EHA51d415f2-GAH4ghHb',
      database: 'railway',
      entities: [Recipe],
      synchronize: true,
    }),
    RecipeModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
