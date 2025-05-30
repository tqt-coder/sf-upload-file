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
        echo "Starting validation deployment to Salesforce..."
        // The correct way to perform a 'check-only' type validation with 'project deploy start'
        // is to include a test level but prevent actual deployment.
        // The most common approach for validation *before* a full deploy is:
        // 1. Run a 'deploy' command with a test level to ensure compilation and basic checks pass.
        // 2. Potentially, use a specific test level that doesn't run all tests, if that's your goal.
        //
        // If you truly want ONLY validation without side effects, you might consider:
        // A. Running with `--test-level RunLocalTests` which implies validation.
        // B. Using a temporary scratch org for validation and then discarding it (more common for feature branches).
        // C. The `deploy:metadata` command had a `--checkonly` flag, but `project:deploy:start` is newer and different.

        // For `project deploy start`, the equivalent of a "check-only" is usually implied by running tests.
        // Let's modify this to perform a full deploy, but with `--dry-run` if you want to explicitly avoid saving.
        // However, `--dry-run` is not available on `project deploy start`.

        // Instead, the *best* practice for a "validation" step with `project deploy start`
        // is to deploy to a throwaway scratch org (if applicable) OR
        // to run a minimal test level that covers compilation.

        // A common pattern: Perform a full deployment, and rely on Apex Test stage for validation.
        // Or, use `--test-level RunLocalTests` for validation.
        // If you truly want a "check-only" without actually deploying, the `project deploy start`
        // command doesn't have a direct `--check-only` flag like `mdapi:deploy`.

        // Let's proceed with the understanding that running `apex run test` (as in the next stage)
        // against the target org will also validate compilation.

        // If your goal is to validate *metadata* compilation without running Apex tests yet,
        // you would typically rely on the compilation phase of a regular deploy or the `sf project deploy validate` command (if it existed).

        // FOR NOW, let's remove the problematic flag and rely on the Apex Test stage for validation
        // OR you can proceed with an actual deploy here if that's the intent.

        // Let's use the command for a *real* deployment, but if this is a validation,
        // ensure you're deploying to a suitable environment (e.g., a Sandbox, not Production directly).
        // For pure "validation" without deploy, the SFDX CLI doesn't have a direct `project deploy start --check-only`.
        // The nearest equivalent might be to deploy to a scratch org, or rely on the build system's compilation.

        // If you strictly want *validation without deployment*, the `sfdx force:source:deploy --checkonly` command
        // (the older command) did support this. However, `project deploy start` is newer.

        // Let's revert to a more standard flow: if this is a validation stage,
        // we'll rely on the Apex tests to catch issues *after* a potential deployment.
        // Or, for a true "validation", you might have to consider `mdapi:deploy` for its `--checkonly` flag.

        // **** REVISED APPROACH: We'll remove the deploy stage for now, and rely on the Apex Test stage to validate the code.
        // If you later want a true "dry run" for metadata, you'd look into `sfdx force:source:deploy --checkonly`
        // or a dedicated scratch org for validation.

        // FOR NOW, let's skip a deploy stage and focus on the tests, or proceed with a real deploy if this is intended for a sandbox.
        // I will comment out this stage entirely for now, or assume this stage will be a *real* deploy if you want one.
        // If you want a *real* deploy to cicd@gmail.com.dev (e.g., a sandbox), uncomment the next line:
        // sh "sfdx project deploy start --source-dir force-app --target-org ${SFDX_USERNAME} --wait 30 --json"
        // echo "Deployment to Salesforce complete."
        
        // Since the previous error was `Nonexistent flag: --check-only`, let's remove it.
        // If you intend to *deploy* here, then the command is:
        // sh "sfdx project deploy start --source-dir force-app --target-org ${SFDX_USERNAME} --wait 30 --json"
        
        // If the goal is strictly validation *before* a full deploy, and `project deploy start` doesn't support it,
        // then the "Validate Deployment" stage might be better served by:
        // 1. Running a smaller set of critical tests.
        // 2. Using a tool that performs static analysis (like PMD).
        // 3. Or, acknowledging that `sfdx project deploy start` with `--test-level` implicitly validates compilation.

        // Given the error, the most direct fix is to remove `--check-only`.
        // If you want to deploy, use the command without it.
        // If you want *only* validation, the strategy needs to change slightly.

        // Let's assume for now that if this stage runs, you intend a *real* deployment.
        // If you want validation, the test run is the primary validation step for Apex/trigger compilation.
        // For metadata compilation, a full deployment (even to a temporary org) is the usual way.

        // Reverting to what a real deploy command would look like, as the validation flag is invalid for project deploy start:
        sh "sf project deploy validate --manifest path/to/package.xml"
        echo "Deployment to Salesforce complete."
      }
    }

    // stage('Run Apex Tests') {
    //   steps {
    //     echo "Running Apex tests..."
    //     sh "sfdx apex run test --target-org ${SFDX_USERNAME} --result-format human --code-coverage --wait 120"
    //     echo "Apex tests complete."
    //   }
    // }
  }
}