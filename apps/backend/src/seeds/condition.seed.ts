import { DataSource } from 'typeorm';
import { Condition } from '../entities/condition.entity';
import dataSource from '../config/database.config';

export async function seedConditions(ds: DataSource): Promise<void> {
    const conditionRepository = ds.getRepository(Condition);

    const conditionsToSeed = [
        { name: 'Bipolar' },
        { name: 'Endo/PCOS' },
        { name: 'Chronic Pain' },
        { name: 'Caregivers' },
    ];

    for (const conditionData of conditionsToSeed) {
        // Check if condition already exists
        const existingCondition = await conditionRepository.findOne({
            where: { name: conditionData.name },
        });

        if (!existingCondition) {
            const condition = conditionRepository.create(conditionData);
            await conditionRepository.save(condition);
            console.log(`✓ Seeded condition: ${conditionData.name}`);
        } else {
            console.log(`- Condition already exists: ${conditionData.name}`);
        }
    }

    console.log('Condition seeding completed!');
}

// Allow running this seed script directly
async function runSeed() {
    try {
        await dataSource.initialize();
        console.log('Database connection established');

        await seedConditions(dataSource);

        await dataSource.destroy();
        console.log('Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding conditions:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    runSeed();
}
