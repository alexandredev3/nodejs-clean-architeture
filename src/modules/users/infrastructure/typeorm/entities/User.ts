import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
class User {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  @Exclude()
  encrypted_password: string;

  @Column('varchar')
  bio: string;

}

export default User;