pipeline {

    agent any

    environment {
        DOCKER_REGISTRY = 'rajkumard92'
        IMAGE_NAME = 'car-app-demo'
        DOCKER_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo '========================================'
                echo 'Checking out source code'
                echo '========================================'

                checkout scm

                echo 'Source code checkout completed'
            }
        }
    }

        stage('Validate Source') {
            steps {
                echo '========================================'
                echo 'Validating project files'
                echo '========================================'

                sh '''
                    test -f Dockerfile
                    test -f nginx.conf
                    test -f docker-compose.yml
                    test -f src/index.html

                    echo "Required files found:"
                    echo "Dockerfile"
                    echo "nginx.conf"
                    echo "docker-compose.yml"
                    echo "src/index.html"

                    echo ""
                    echo "HTML files:"
                    find src/ -name "*.html" -print

                    echo ""
                    echo "CSS files:"
                    find src/ -name "*.css" -print

                    echo ""
                    echo "JavaScript files:"
                    find src/ -name "*.js" -print
                '''

                echo 'Source validation completed'
            }
        }


        stage('Test') {
            steps {
                echo '========================================'
                echo 'Running application tests'
                echo '========================================'

                sh '''
                    echo "Running frontend validation..."

                    test -s src/index.html

                    echo "index.html exists and is not empty"

                    echo "Frontend validation passed"
                '''
            }
        }


        stage('Build Docker Image') {
            steps {
                script {

                    echo '========================================'
                    echo 'Building Docker image'
                    echo '========================================'

                    sh """
                        docker build \
                            -t ${DOCKER_REGISTRY}/${IMAGE_NAME}:${DOCKER_TAG} \
                            -t ${DOCKER_REGISTRY}/${IMAGE_NAME}:latest \
                            .
                    """

                    echo "Docker image created:"
                    echo "${DOCKER_REGISTRY}/${IMAGE_NAME}:${DOCKER_TAG}"
                    echo "${DOCKER_REGISTRY}/${IMAGE_NAME}:latest"
                }
            }
        }


        stage('Test Docker Image') {
            steps {
                script {

                    echo '========================================'
                    echo 'Testing Docker image'
                    echo '========================================'

                    sh '''
                        docker rm -f test-supercar 2>/dev/null || true

                        docker run -d \
                            --name test-supercar \
                            -p 8081:80 \
                            ${DOCKER_REGISTRY}/${IMAGE_NAME}:${DOCKER_TAG}

                        echo "Waiting for Nginx..."
                        sleep 5

                        echo "Testing application..."

                        curl -f http://localhost:8081/

                        echo ""
                        echo "Docker image test PASSED"

                        docker rm -f test-supercar
                    '''
                }
            }
        }


        stage('Push Docker Image') {
            steps {
                script {

                    echo '========================================'
                    echo 'Pushing image to Docker Hub'
                    echo '========================================'

                    withCredentials([
                        usernamePassword(
                            credentialsId: 'dockerhub-credentials',
                            usernameVariable: 'DOCKER_USERNAME',
                            passwordVariable: 'DOCKER_PASSWORD'
                        )
                    ]) {

                        sh '''
                            echo "$DOCKER_PASSWORD" | docker login \
                                --username "$DOCKER_USERNAME" \
                                --password-stdin

                            docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:${DOCKER_TAG}

                            docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:latest

                            docker logout
                        '''
                    }

                    echo 'Docker images pushed successfully'
                }
            }
        }


        stage('Deploy') {
    steps {
        script {
            echo '========================================'
            echo 'Deploying application'
            echo '========================================'

            sh '''
                echo "Pulling latest Docker image..."
                docker pull ${DOCKER_IMAGE}:latest

                echo "Stopping old application..."
                docker compose down || true

                echo "Starting new application..."
                docker compose up -d

                echo "Checking running containers..."
                docker ps

                echo "Testing application..."
                sleep 5
                curl -f http://localhost:8081/

                echo "Application deployed successfully!"
            '''
        }
    }
}

    post {

        success {
            echo '========================================'
            echo 'PIPELINE SUCCESS'
            echo '========================================'

            echo "Build Number: ${BUILD_NUMBER}"
            echo "Docker Image: ${DOCKER_REGISTRY}/${IMAGE_NAME}:${DOCKER_TAG}"
            echo "Latest Image: ${DOCKER_REGISTRY}/${IMAGE_NAME}:latest"
            echo "Application Port: 8080"
        }

        failure {
            echo '========================================'
            echo 'PIPELINE FAILED'
            echo '========================================'

            echo 'Check the Jenkins Console Output for the error.'
        }

        always {
            sh '''
                docker rm -f test-supercar 2>/dev/null || true
            '''

            cleanWs()
        }
    }
}
