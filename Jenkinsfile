pipeline {

    agent any

    stages {
      stage('Build') {
        steps {
            sh 'docker-compose -f ./docker/test.yml build'
            sh 'docker-compose -f ./docker/test.yml up -d'
            sh 'docker restart test_nginx'
        }
      }
    }
    post {
      
        success {
            sh 'docker save adele.html2image > /home/images/eddr/adele.html2image.tar'
            sh 'docker tag adele.html2image registry.dpdok.com.ua/adele.html2image:latest'


            script {
              docker.withRegistry( 'https://registry.dpdok.com.ua', 'privateregistry' ) {
                  sh "docker push registry.dpdok.com.ua/adele.html2image:latest"
              }
            }

        }


        failure {
 
             emailext body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
                recipientProviders: [[$class: 'RequesterRecipientProvider']],
                subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}"  
         }
    }
}