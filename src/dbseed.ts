import { MongoClient } from 'mongodb';

import { DATA_URL, DATA_DB } from './environments';

async function main() {
  console.log('🚀  Server ready');

  const url = DATA_URL!;

  const dbName = DATA_DB!;

  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('url :>>', url);
  try {
    await client.connect();
    console.log('🌱  Database seeder is running ...');
    const db = client.db(dbName);

    // const tests = [...Array(10000).keys()].map(item => ({
    // 		_id: item,
    // 		userId: 'c30c0730-be4f-11e9-9f04-f72d443f7ef2',
    // 		description: 'test' + item,
    // 		createdAt: new Date(),
    // 		updatedAt: new Date()
    // 	}))

    // 	await db.collection('history').insertMany(tests)

    const users = [
      {
        _id: 'fad675e4-8a5c-4528-a3f2-d9a5Qecaf2946',
        firstName: 'Hồ',
        lastName: 'Anh',
        avatar: null,
        resetPasswordToken: null,
        resetPasswordExpires: null,
        stripeId: null,
        ccLast4: null,
      },
      {
        _id: '5f76156e-c726-42d5-8d30-d0adf243216d',
        firstName: 'Admin',
        lastName: 'Sub',
        avatar: null,
        resetPasswordToken: null,
        resetPasswordExpires: null,
        stripeId: null,
        ccLast4: null,
      },
    ];

    await db.collection('users').findOneAndUpdate(
      { _id: users[0]._id },
      {
        $set: {
          ...users[0],
          firstName: users[0].firstName,
          lastName: users[0].lastName,
          isVerified: true,
          isOnline: false,
          isLocked: false,
          reason: '',
          isActive: true,
          createdAt: +new Date(),
          updatedAt: +new Date(),
        },
      },
      { upsert: true },
    );

    await Promise.all(
      users.map(async (user) => {
        await db.collection('users').findOneAndUpdate(
          { _id: user._id },
          {
            $set: {
              ...user,
              firstName: user.firstName,
              lastName: user.lastName,
              isVerified: true,
              isOnline: false,
              isLocked: false,
              reason: '',
              isActive: true,
              createdAt: +new Date(),
              updatedAt: +new Date(),
            },
          },
          { upsert: true },
        );
      }),
    );

    // const accounts = [
    //   {
    //     _id: 'fad675e4-8a5c-4528-a3f2-d9a5Qecaf2946',
    //     firstName: 'Hồ',
    //     lastName: 'Anh',
    //     avatar: null,
    //     resetPasswordToken: null,
    //     resetPasswordExpires: null,
    //     stripeId: null,
    //     ccLast4: null,
    //   },
    //   {
    //     _id: '5f76156e-c726-42d5-8d30-d0adf243216d',
    //     firstName: 'Admin',
    //     lastName: 'Sub',
    //     avatar: null,
    //     resetPasswordToken: null,
    //     resetPasswordExpires: null,
    //     stripeId: null,
    //     ccLast4: null,
    //   },
    // ];

    await client.close();
    console.log('💤 Server off');
  } catch (err) {
    console.log('❌  Server error', err.stack);
  }
}

main();
