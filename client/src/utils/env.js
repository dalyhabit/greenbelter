const getEnvVar = (key, defaultValue = null) => {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue === null) {
      console.warn(`Environment variable ${key} is not set`);
    }
    return defaultValue;
  }
  return value;
};

export const env = {
  // Application
  NODE_ENV: getEnvVar('NODE_ENV', 'development'),
  PORT: parseInt(getEnvVar('PORT', '3000'), 10),

  // API Configuration
  API_BASE_URL: getEnvVar('API_BASE_URL', 'http://localhost:3000/api'),
  API_VERSION: getEnvVar('API_VERSION', 'v1'),

  // Feature Flags
  ENABLE_ANALYTICS: getEnvVar('ENABLE_ANALYTICS', 'false') === 'true',
  ENABLE_DEBUG_MODE: getEnvVar('ENABLE_DEBUG_MODE', 'false') === 'true',

  // AWS Configuration
  AWS_REGION: getEnvVar('AWS_REGION'),
  AWS_COGNITO_USER_POOL_ID: getEnvVar('AWS_COGNITO_USER_POOL_ID'),
  AWS_COGNITO_CLIENT_ID: getEnvVar('AWS_COGNITO_CLIENT_ID'),
}; 