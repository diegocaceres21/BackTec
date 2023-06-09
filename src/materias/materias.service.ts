import { Injectable } from '@nestjs/common';
import { CreateMateria } from './dto/create-materia.dto';
import { Materia } from './entities/materia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import{Repository}from 'typeorm';
import { UpdateMateria } from './dto/update-materia.dto';
@Injectable()
export class MateriaService{
    constructor(@InjectRepository(Materia)private MateriaRepository:Repository<Materia>){}
    create(createMateria:CreateMateria){
          return this.MateriaRepository.save(createMateria);
    }
    findAll(){
          return  this.MateriaRepository.find({
            relations:['nota','inscripcion']
          });
    }
    findOne(id:number){
        return this.MateriaRepository.findOne({
            where: {
              id,
            },relations: ['nota', 'inscripcion']
          });
    }
    update(sigla:string,updateMateria:UpdateMateria){
        return this.MateriaRepository.update({sigla:sigla}, {
            sigla:updateMateria.sigla,
            nombre:updateMateria.nombre,
            descripcion:updateMateria.descripcion,
            //departamento:updateMateria.departamento
        });
    }
    remove(sigla:string){
        return this.MateriaRepository.delete(sigla);
    }
    
}