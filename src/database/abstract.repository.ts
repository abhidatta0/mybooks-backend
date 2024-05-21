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

    async updateOne(criteria: FindOptionsWhere<T>, data: DeepPartial<T>): Promise<T> {
        const entity = await this.repository.findOne({ where: criteria });
        if (!entity) {
            return null; // No entity found with the given criteria
        }

        // Update the found entity with the provided data
        const updatedEntity = this.repository.merge(entity, data);
        return this.repository.save(updatedEntity);
    }

    async delete(criteria: FindOptionsWhere<T>): Promise<DeleteResult> {
        return this.repository.delete(criteria);
    }
    
}

export default AbstractRepository;