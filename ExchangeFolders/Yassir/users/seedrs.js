const seedUsers = async (count) => {
    try {
        await mongoose.connect(config.database.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const hashedPassword = await hashPassword("12345678");

        const usersData = generateDynamicUserData(count);

        for (const userData of usersData) {
            const user = new User({
                ...userData,
                password: hashedPassword,
            });
            await user.save();
            console.log(`User ${userData.userName} seeded successfully.`);
        }

        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding users:", error);
    }
};
