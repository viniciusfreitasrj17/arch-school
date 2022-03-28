import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationBetweenStudentsScore1648497522663 implements MigrationInterface {
    name = 'RelationBetweenStudentsScore1648497522663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "score" ADD "idStudent" uuid`);
        await queryRunner.query(`ALTER TABLE "score" ADD CONSTRAINT "FK_5bbc94688d9b61816c753427873" FOREIGN KEY ("idStudent") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "score" DROP CONSTRAINT "FK_5bbc94688d9b61816c753427873"`);
        await queryRunner.query(`ALTER TABLE "score" DROP COLUMN "idStudent"`);
    }

}
