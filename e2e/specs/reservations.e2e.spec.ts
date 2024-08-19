describe('Reservations', () => {
  let jwt: string;
  const headers = { 'Content-Type': 'application/json' };

  beforeAll(async () => {
    const user = {
      email: 'john_doe@email.com',
      password: '$trong_P4ssw0rd',
    };

    await fetch('http://auth:3001/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers,
    });

    const response = await fetch('http://auth:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers,
    });

    jwt = await response.text();
  });

  test('Create & Get', async () => {
    const responseCreate = await fetch('http://reservations:3000/reservations', {
      method: 'POST',
      headers: { ...headers, Authorization: jwt },
      body: JSON.stringify({
        startDate: '2024-08-19T06:03:17.025Z',
        endDate: '2024-08-19T06:03:17.025Z',
        charge: {
          card: {
            number: '4242 4242 4242 4242',
            exp_month: 12,
            exp_year: 2034,
            cvc: '567',
          },
          amount: 5,
        },
      }),
    });

    expect(responseCreate.ok).toBeTruthy();
    const createdReservation = await responseCreate.json();

    const responseGet = await fetch(`http://reservations:3000/reservations/${createdReservation._id}`, {
      headers: { ...headers, Authorization: jwt },
    });
    const reservation = await responseGet.json();

    expect(createdReservation).toEqual(reservation);
  });
});
