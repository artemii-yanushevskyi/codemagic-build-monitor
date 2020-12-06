import { Controller, Get, Route } from '@tsoa/runtime';
import { BasicBuildInfo } from '../api-types';

@Route('basic')
export class BasicBuildInfoController extends Controller {
  public constructor(private readonly serverId: string) {
    super();
  }

  @Get('')
  public async getBasicBuildInfo(): Promise<BasicBuildInfo> {
    return {
      protocol: 'https://catlight.io/protocol/v1.0/basic',
      id: this.serverId,
      webUrl: 'http://myserver.example/dashboard',
      name: 'My Server',
      currentUser: {
        id: 'tim95',
        name: 'Tim Drake',
      },
      spaces: [
        {
          id: 'super-project',
          name: 'Super Project',
          webUrl: 'http://myserver.example/super-project',

          buildDefinitions: [
            {
              id: 'nightly-build',
              name: 'Nightly Integration Build',
              webUrl: 'http://myserver.example/super-project/nightly-build/view',
              folder: 'build folder/subfolder',
              branches: [
                {
                  id: 'develop',
                  builds: [
                    {
                      id: '100',
                      webUrl: 'http://myserver.example/super-project/nightly-build/100',
                      status: 'Succeeded',
                      startTime: new Date(Date.parse('2017-01-25T17:30:10.000Z')),
                      finishTime: new Date(Date.parse('2017-01-25T17:30:20.000Z')),
                      triggeredByUser: {
                        id: 'tim95',
                        name: 'Tim Drake',
                      },
                      contributors: [
                        {
                          id: 'jgordon',
                          name: 'James Gordon',
                        },
                      ],
                    },
                    {
                      id: '101',
                      webUrl: 'http://myserver.example/super-project/nightly-build/101',
                      status: 'Running',
                      startTime: new Date(Date.parse('2017-01-25T17:40:10.000Z')),
                      triggeredByUser: {
                        id: 'jgordon',
                        name: 'James Gordon',
                      },
                    },
                  ],
                },
                {
                  id: 'features/new-searchlight',
                  builds: [
                    {
                      id: '300',
                      webUrl: 'http://myserver.example/super-project/nightly-build/300',
                      status: 'Succeeded',
                      startTime: new Date(Date.parse('2017-01-25T16:30:10.000Z')),
                      finishTime: new Date(Date.parse('2017-01-25T16:30:20.000Z')),
                      triggeredByUser: {
                        id: 'tim95',
                        name: 'Tim Drake',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
  }
}
