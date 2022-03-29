import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFieldCreatedAtAndUpdatedAt1648569142952 implements MigrationInterface {
    name = 'AddFieldCreatedAtAndUpdatedAt1648569142952'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "student" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "student" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "score" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "score" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "score" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "score" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "createdAt"`);
    }

}
