async function runSeeds() {
    try {
        // Run the specified seed function (in this case, seedUser)
        await seedUsers(10);
        console.log('Seed completed successfully.');
    } catch (error) {
        console.error('Error during seeding:', error);
    }
}