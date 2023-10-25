const generateDynamicCustomerData = (count) => {
    const customersData = [];
  
    for (let i = 1; i <= count; i++) {
      const customerData = {
        firstName: `Customer${i}`,
        lastName: `Last${i}`,
        email: `customer${i}@example.com`,
        password: `password${i}`,
        creationDate: Date.now(),
        validatAccount: true,
        active: true,
      };
  
      customersData.push(customerData);
    }
  
    return customersData;
  };
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
