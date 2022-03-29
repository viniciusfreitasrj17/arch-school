import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPasswordInAdmin1648565820689 implements MigrationInterface {
    name = 'AddPasswordInAdmin1648565820689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "password"`);
    }

}
