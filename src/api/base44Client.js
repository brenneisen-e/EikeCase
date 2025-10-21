// Local client to replace base44 SDK
import { localDB } from './localStorage';
import { MockIntegrations } from './mockIntegrations';

// Entity wrapper to provide the same API as base44
class EntityWrapper {
  constructor(entityName) {
    this.entityName = entityName;
  }

  async list() {
    return localDB.list(this.entityName);
  }

  async create(data) {
    return localDB.create(this.entityName, data);
  }

  async update(id, data) {
    return localDB.update(this.entityName, id, data);
  }

  async delete(id) {
    return localDB.delete(this.entityName, id);
  }

  async findById(id) {
    return localDB.findById(this.entityName, id);
  }
}

// Create a client that mimics the base44 SDK API
export const base44 = {
  entities: {
    VisitedCountry: new EntityWrapper('visitedCountries'),
    CompanyLogo: new EntityWrapper('companyLogos'),
    SystemConnection: new EntityWrapper('systemConnections'),
    DiagramNode: new EntityWrapper('diagramNodes'),
    DiagramEdge: new EntityWrapper('diagramEdges'),
    DiagramSettings: new EntityWrapper('diagramSettings'),
    Country: new EntityWrapper('countries'),
    HtmlPrototype: new EntityWrapper('htmlPrototypes'),
    ClaudeApiKey: new EntityWrapper('claudeApiKeys'),
    CockpitData: new EntityWrapper('cockpitData')
  },
  integrations: MockIntegrations,
  auth: {
    // Mock auth methods
    getCurrentUser: async () => {
      return {
        id: 'mock-user-1',
        email: 'demo@example.com',
        name: 'Demo User'
      };
    },
    signIn: async (email, password) => {
      console.log('Mock signIn:', email);
      return { success: true, user: { email } };
    },
    signOut: async () => {
      console.log('Mock signOut');
      return { success: true };
    },
    signUp: async (email, password) => {
      console.log('Mock signUp:', email);
      return { success: true, user: { email } };
    }
  }
};
