import { Column, Table, Model, PrimaryKey } from 'sequelize-typescript';

@Table({
  tableName: 'User',
})
export class User extends Model {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  id: number;

  @Column
  username: string;

  @Column
  password: string;

  @Column
  updatedAt: Date;

  @Column
  createdAt: Date;
}
