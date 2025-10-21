// Mock integrations to replace base44 integrations

export const MockIntegrations = {
  Core: {
    // Mock InvokeLLM - simulates an LLM response
    InvokeLLM: async ({ prompt, add_context_from_internet = false }) => {
      console.log('MockIntegrations.InvokeLLM called with:', { prompt, add_context_from_internet });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Return a mock response
      return {
        response: `Dies ist eine Mock-Antwort auf Ihre Frage. In einer produktiven Umgebung würde hier eine echte Claude AI-Antwort erscheinen.\n\nIhre Anfrage war: "${prompt.substring(0, 100)}..."\n\nUm echte AI-Antworten zu erhalten, können Sie:\n1. Eine eigene Claude API-Integration einrichten\n2. Ein anderes LLM-Backend verwenden\n3. Die Funktion entsprechend Ihrer Bedürfnisse anpassen`
      };
    },

    // Mock SendEmail
    SendEmail: async ({ to, subject, body }) => {
      console.log('MockIntegrations.SendEmail called:', { to, subject, body });
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true, message: 'Mock email sent' };
    },

    // Mock UploadFile
    UploadFile: async (file) => {
      console.log('MockIntegrations.UploadFile called:', file);
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        success: true,
        url: URL.createObjectURL(file),
        filename: file.name
      };
    },

    // Mock GenerateImage
    GenerateImage: async ({ prompt, size = '1024x1024' }) => {
      console.log('MockIntegrations.GenerateImage called:', { prompt, size });
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        success: true,
        url: `https://via.placeholder.com/${size}/86BC25/FFFFFF?text=Generated+Image`,
        prompt
      };
    },

    // Mock ExtractDataFromUploadedFile
    ExtractDataFromUploadedFile: async (fileUrl) => {
      console.log('MockIntegrations.ExtractDataFromUploadedFile called:', fileUrl);
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        success: true,
        data: { text: 'Extracted mock data from file' }
      };
    },

    // Mock CreateFileSignedUrl
    CreateFileSignedUrl: async (filename) => {
      console.log('MockIntegrations.CreateFileSignedUrl called:', filename);
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        success: true,
        url: `https://example.com/files/${filename}`,
        expiresIn: 3600
      };
    },

    // Mock UploadPrivateFile
    UploadPrivateFile: async (file) => {
      console.log('MockIntegrations.UploadPrivateFile called:', file);
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        success: true,
        fileId: 'mock-file-' + Date.now(),
        filename: file.name
      };
    }
  }
};
