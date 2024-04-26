import {FindOptionsWhere, Repository, DeepPartial, DeleteResult} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import BaseEntity from 'src/common/entities/BaseEntity';

abstract class AbstractRepository <T extends BaseEntity>{
    constructor(private readonly repository: Repository<T>){}

    async create(entity: DeepPartial<T>): Promise<T> {
        return this.repository.save(entity);
    }

    async findAll(criteria?: FindOptionsWhere<T>): Promise<T[]> {
        return this.repository.find({where: criteria});
    }
    
    async findOneWhere(criteria: FindOptionsWhere<T>): Promise<T> {
      return this.repository.findOne({where: criteria});
    }

    async update(criteria: FindOptionsWhere<T>, data: QueryDeepPartialEntity<T>): Promise<T> {
        await this.repository.update(criteria, data);
        return this.findOneWhere(criteria);
    }

    async delete(criteria: FindOptionsWhere<T>): Promise<DeleteResult> {
        return this.repository.delete(criteria);
    }
    
}

export default AbstractRepository;