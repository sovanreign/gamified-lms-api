import { Injectable } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ModulesService {
  constructor(private db: DatabaseService) {}

  create(createModuleDto: CreateModuleDto) {
    return 'This action adds a new module';
  }

  findAll() {
    return this.db.module.findMany({});
  }

  findOne(id: number) {
    return `This action returns a #${id} module`;
  }

  async update(id: string, updateModuleDto: UpdateModuleDto) {
    await this.db.module.update({
      where: { id },
      data: updateModuleDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} module`;
  }
}
