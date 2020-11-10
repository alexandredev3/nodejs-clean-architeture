import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsers1604878950049 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // caso esteja com problema por causa do uuid_generate_v4() coloque essa linha.
    // instalar extensão uuid, para usar o "uuid_generate".
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true
        },
        {
          name: 'encrypted_password',
          type: 'varchar'
        },
        {
          name: 'bio',
          type: 'varchar',
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }

}
