describe('Reservations', () => {
  beforeAll(async () => {
    const user = {
      email: 'john_doe@email.com',
      password: '$trong_P4ssw0rd',
    };

    await fetch('http://auth:30001', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  });

  test('Create', () => {});
});
