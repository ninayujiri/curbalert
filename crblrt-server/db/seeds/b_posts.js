const faker = require("faker");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {
          user_id: faker.random.number({min:1, max:5}),
          title: 'Clothing',
          content: faker.lorem.sentence(word_count = 4),
          image_url: 'http://res.cloudinary.com/ninayujiri/image/upload/v1528420860/1.jpg',
          geo_tag: knex.raw(`point(45.4768, -73.5842)`),
          point_value: 1,
          visible: true,
          claimed_by: null
        },
        {
          user_id: faker.random.number({min:1, max:5}),
          title: 'Books',
          content: null,
          image_url: 'http://res.cloudinary.com/ninayujiri/image/upload/v1528420860/2.jpg',
          geo_tag: knex.raw(`point(45.4548, -73.5699)`),
          point_value: 1,
          visible: true,
          claimed_by: null
        },
        {
          user_id: faker.random.number({min:1, max:5}),
          title: 'Fan',
          content: faker.lorem.sentence(word_count = 5),
          image_url: 'http://res.cloudinary.com/ninayujiri/image/upload/v1528420860/3.jpg',
          geo_tag: knex.raw(`point(45.4914, -73.5605)`),
          point_value: 1,
          visible: true,
          claimed_by: null
        },
        {
          user_id: faker.random.number({min:1, max:5}),
          title: 'Bike',
          content: faker.lorem.sentence(word_count = 10),
          image_url: 'http://res.cloudinary.com/ninayujiri/image/upload/v1528420860/4.jpg',
          geo_tag: knex.raw(`point(45.5017, -73.5673)`),
          point_value: 1,
          visible: true,
          claimed_by: null
        },
        {
          user_id: faker.random.number({min:1, max:5}),
          title: 'Chair',
          content: faker.lorem.sentence(word_count = 7),
          image_url: 'http://res.cloudinary.com/ninayujiri/image/upload/v1528420860/5.jpg',
          geo_tag: knex.raw(`point(45.5232, -73.5870)`),
          point_value: 1,
          visible: true,
          claimed_by: null
        },
        {
          user_id: faker.random.number({min:1, max:5}),
          title: 'Sidetable',
          content: faker.lorem.sentence(word_count = 7),
          image_url: 'http://res.cloudinary.com/ninayujiri/image/upload/v1528912168/ny-1.jpg',
          geo_tag: knex.raw(`point(40.7589, -73.9851)`),
          point_value: 1,
          visible: true,
          claimed_by: null
        },
        {
          user_id: faker.random.number({min:1, max:5}),
          title: 'Cactus',
          content: faker.lorem.sentence(word_count = 7),
          image_url: 'http://res.cloudinary.com/ninayujiri/image/upload/v1528912168/ny-2.jpg',
          geo_tag: knex.raw(`point(40.6782, -73.9442)`),
          point_value: 1,
          visible: true,
          claimed_by: null
        },
        {
          user_id: faker.random.number({min:1, max:5}),
          title: 'Armchair',
          content: faker.lorem.sentence(word_count = 7),
          image_url: 'http://res.cloudinary.com/ninayujiri/image/upload/v1528912168/ny-3.jpg',
          geo_tag: knex.raw(`point(40.7829, -73.9654)`),
          point_value: 1,
          visible: true,
          claimed_by: null
        },
        {
          user_id: faker.random.number({min:1, max:5}),
          title: 'Television',
          content: faker.lorem.sentence(word_count = 7),
          image_url: 'http://res.cloudinary.com/ninayujiri/image/upload/v1528912871/ny-4.jpg',
          geo_tag: knex.raw(`point(40.7638, -73.9918)`),
          point_value: 1,
          visible: true,
          claimed_by: null
        },
        {
          user_id: faker.random.number({min:1, max:5}),
          title: 'Jeans',
          content: faker.lorem.sentence(word_count = 7),
          image_url: 'http://res.cloudinary.com/ninayujiri/image/upload/v1528912871/ny-5.jpg',
          geo_tag: knex.raw(`point(40.8116, -73.9465)`),
          point_value: 1,
          visible: true,
          claimed_by: null
        }
      ]);
    });
};
