// PATH, METHOD, STATUSCODE, BODY
const dummyDB = [
  ['POST', '/user', 201, { id: 1 }],
  [
    'GET',
    '/user',
    200,
    {
      user_id: 1,
      username: 'test',
      email: 'testuser@test.com',
      created_at: '2018-01-01 00:00:00',
      updated_at: '2018-01-01 00:00:00',
      profile_img:
        'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    },
  ],
  ['PUT', '/user', 204, {}],
  //Questions
  [
    'GET',
    '/questions',
    200,
    {
      result: [
        {
          board_id: 1,
          title: 'Test Question',
          description: 'Test Description',
          created_at: '2018-01-01 00:00:00',
          updated_at: '2018-01-01 00:00:00',
          user_id: 1,
          user_img:
            'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        },
        {
          board_id: 2,
          title: 'Your test Question DUMMY',
          description: 'Test Description',
          created_at: '2018-01-01 00:00:00',
          updated_at: '2018-01-01 00:00:00',
          user_id: 1,
          user_img:
            'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        },
      ],
    },
  ],
];

export default dummyDB;