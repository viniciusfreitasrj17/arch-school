import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateScore1648496694590 implements MigrationInterface {
    name = 'CreateScore1648496694590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "score" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "n1" integer NOT NULL, "n2" integer NOT NULL, "n3" integer NOT NULL, "n4" integer NOT NULL, CONSTRAINT "PK_1770f42c61451103f5514134078" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "score"`);
    }

}
