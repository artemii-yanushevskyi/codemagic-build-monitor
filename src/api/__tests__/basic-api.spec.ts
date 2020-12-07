import { ApiTestTools, TEST_SETTINGS, TestAgent } from '../__testTools__/ApiTestTools';
import { BasicBuildInfoResponse } from '../api-types';
import { InMemoryUserRepository } from '../../infra/memory/InMemoryUserRepository';
import { User } from '../../domain/IUserRepository';

describe('/basic', () => {
  describe('GET /basic', () => {
    test('should return a 401 status code when missing bearer token', async () => {
      const agent = ApiTestTools.createTestAgent();
      const response = await agent.get('/basic').send();
      expect(response.status).toBe(401);
      expect(response.type).toBe('application/json');
    });

    describe('with token of existing user', () => {
      const token = 'THIS_IS_THE_TOKEN';
      const user: User = { id: 'USER_ID', login: 'USER_LOGIN' };
      const installationId = 'THE_INSTALLATION_ID';
      let agent: TestAgent;

      beforeEach(() => {
        const userRepo = new InMemoryUserRepository();
        userRepo.addUser(token, user);

        agent = ApiTestTools.createTestAgent(
          { userRepo },
          {
            ...TEST_SETTINGS,
            catlight: { ...TEST_SETTINGS.catlight, installationId },
          }
        );
      });

      test('should return a 200 status code', async () => {
        const response = await agent.get('/basic').set('Authorization', `Bearer ${token}`).send();
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');

        const body = response.body as BasicBuildInfoResponse;
        expect(body.protocol).toBe('https://catlight.io/protocol/v1.0/basic');
      });

      test('should identify server as gha-build-monitor', async () => {
        const response = await agent.get('/basic').set('Authorization', `Bearer ${token}`).send();

        const body = response.body as BasicBuildInfoResponse;
        expect(body.id).toMatch(/^gha-build-monitor.*/u);
        expect(body.name).toEqual('gha-build-monitor');
        expect(body.serverVersion).toMatch(/[0-9]+.[0-9]+.[0-9]+/u);
      });

      test('should have installationId in server id', async () => {
        const response = await agent.get('/basic').set('Authorization', `Bearer ${token}`).send();

        const body = response.body as BasicBuildInfoResponse;
        expect(body.id).toMatch(RegExp(`${installationId}$`, 'u'));
      });

      test('should return current user information', async () => {
        const response = await agent.get('/basic').set('Authorization', `Bearer ${token}`).send();

        const body = response.body as BasicBuildInfoResponse;
        expect(body.currentUser).toEqual({ id: user.id, name: user.login });
      });
    });
  });
});
