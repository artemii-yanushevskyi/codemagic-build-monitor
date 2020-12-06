import { ApiTestTools, TEST_SETTINGS, TestAgent } from '../__testTools__/ApiTestTools';
import { BasicBuildInfo } from '../api/api-types';

describe('/basic', () => {
  describe('GET /basic', () => {
    test('should return a 200 status code', async () => {
      const agent = createTestAgent();
      const response = await agent.get('/basic').send();
      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');

      const body = response.body as BasicBuildInfo;
      expect(body.protocol).toBe('https://catlight.io/protocol/v1.0/basic');
    });

    test('should have installationId in server id', async () => {
      const installationId = 'this_is_some_stuff';
      const agent = createTestAgent(installationId);
      const response = await agent.get('/basic').send();

      const body = response.body as BasicBuildInfo;
      expect(body.id).toMatch(/^gha-build-monitor.*/u);
      expect(body.id).toMatch(installationId);
    });
  });
});

function createTestAgent(installationId = 'installation_id'): TestAgent {
  return ApiTestTools.createTestAgent({
    ...TEST_SETTINGS,
    catlight: { ...TEST_SETTINGS.catlight, installationId },
  });
}
