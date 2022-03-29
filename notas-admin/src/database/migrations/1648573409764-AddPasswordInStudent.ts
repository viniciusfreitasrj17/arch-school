import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPasswordInStudent1648573409764 implements MigrationInterface {
    name = 'AddPasswordInStudent1648573409764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "email"`);
    }

}
