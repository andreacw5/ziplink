import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Url extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string & { __brand: 'urlId' };

  @Column({ nullable: true })
  description: string;

  url: string;

  @Column({ unique: true })
  code: string;

  @Column()
  protected: boolean;

  @Column()
  click: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
