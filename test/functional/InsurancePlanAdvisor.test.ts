import * as container from '../../src/infrastructure/container';
import { buildServer } from '../../src/server/server';
import { StatusCodes } from 'http-status-codes';
import sendHttpRequest from '../helpers/send-http-request';

describe('HTTP server', () => {
  let server;

  beforeAll(async () => {
    server = buildServer(container);
    await server.listen(1337);
  });

  afterAll(() => server.close());

  it('returns an OK response with the expected content', async () => {
    const response = await sendHttpRequest({
      url: 'http://0.0.0.0:1337/',
      method: 'POST',
      data: {
        age: 35,
        dependents: 2,
        house: { ownership_status: 'owned' },
        income: 0,
        marital_status: 'married',
        risk_questions: [0, 1, 0],
        vehicle: { year: 2018 }
      }
    });

    expect(response.status).toEqual(StatusCodes.OK);
    expect(response.data).toEqual({
      auto: expect.any(String),
      home: expect.any(String),
      life: expect.any(String),
      disability: expect.any(String),
      renters: expect.any(String),
      umbrella: expect.any(String),
    });
  });

  it('it returns a Bad Request response when a validation error occurs', async () => {
    const response = await sendHttpRequest({
      url: 'http://0.0.0.0:1337/',
      method: 'POST',
      data: {}
    });

    expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.data).toEqual({
      type: 'ValidationError',
      message: expect.any(String)
    });
  });
});
