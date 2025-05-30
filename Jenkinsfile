pipeline {
  agent any

  environment {
    SFDX_CLIENT_ID = '3MVG9k02hQhyUgQDBJAoxFVn.lE3yjPvfbFOypoYXYTwxLMgZ8BlP7YNtoDaX_Wb2ipev2c_1PGX_Qdvq9yBA'
    SFDX_JWT_KEY = '/var/jenkins_home/.ssh/server.key'
    SFDX_USERNAME = 'cicd@gmail.com.dev'
  }

  stages {
    stage('Authenticate with Salesforce') {
      steps {
        sh """
          echo "Authenticating with Salesforce..."
          sfdx auth:jwt:grant \\
            --client-id "${SFDX_CLIENT_ID}" \\
            --jwt-key-file "${SFDX_JWT_KEY}" \\
            --username "${SFDX_USERNAME}" \\
            --set-default-dev-hub
          echo "Authentication complete."
        """
      }
    }

    stage('Validate Deployment') {
      steps {
        echo "Starting validation deployment to Salesforce using package.xml..."
        // Ensure your package.xml path is correct relative to your workspace
        sh "sf project deploy validate --manifest force-app/main/default/package.xml --target-org ${SFDX_USERNAME} --wait 10"
        echo "Validation complete."
      }
    }

    // stage('Run Apex Tests') {
    //   steps {
    //     echo "Running Apex tests..."
    //     sh "sf apex run test --target-org ${SFDX_USERNAME} --result-format human --code-coverage --wait 120"
    //     echo "Apex tests complete."
    //   }
    // }
  }
}
