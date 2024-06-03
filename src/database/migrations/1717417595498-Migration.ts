import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1717417595498 implements MigrationInterface {
    name = 'Migration1717417595498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` ADD \`previous_updated\` timestamp NULL`);
        await queryRunner.query(`
            UPDATE \`books\`
            SET previous_updated = updated_at
            WHERE previous_updated IS NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`previous_updated\``);
    }

}
