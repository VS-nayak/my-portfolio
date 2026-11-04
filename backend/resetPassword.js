const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function resetPassword() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const newPassword = 'Admin@12345';

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await mongoose.connection
      .collection('admins')
      .updateOne(
        { email: 'admin@gmail.com' },
        { $set: { password: hashedPassword } }
      );

    if (result.matchedCount === 1) {
      console.log('Password reset successful!');
      console.log('New password:', newPassword);
    } else {
      console.log('Admin account not found!');
    }

  } catch (error) {
    console.log(error.message);
  } finally {
    await mongoose.disconnect();
  }
}

resetPassword();