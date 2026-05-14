const bcrypt = require('bcryptjs');

async function generateHashes() {
  try {
    const password1 = 'password123';
    const password2 = 'admin123';

    const hash1 = await bcrypt.hash(password1, 10);
    const hash2 = await bcrypt.hash(password2, 10);

    console.log('\n=== Use these hashed passwords in MongoDB Compass ===\n');
    console.log('For user@test.com (password: password123):');
    console.log(`"password": "${hash1}"`);
    console.log('\nFor admin@test.com (password: admin123):');
    console.log(`"password": "${hash2}"`);
    
    console.log('\n=== Full user documents to insert ===\n');
    console.log('User 1:');
    console.log(JSON.stringify({
      name: "Test User",
      email: "user@test.com",
      password: hash1,
      role: "user",
      address: "123 Main St, City",
      phone: "09123456789"
    }, null, 2));

    console.log('\nUser 2:');
    console.log(JSON.stringify({
      name: "Admin User",
      email: "admin@test.com",
      password: hash2,
      role: "admin",
      address: "456 Admin St, Admin City",
      phone: "09987654321"
    }, null, 2));

  } catch (err) {
    console.error('Error:', err);
  }
}

generateHashes();
