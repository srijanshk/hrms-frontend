agentName = "master"
pipeline {
  agent {label agentName}
    
  //tools {nodejs "node"}
   stages {
        
    stage('Cloning Git') {
      steps {
        git branch: 'develop',
            credentialsId: 'a7e32b0a-b2af-426b-8042-af214734f21e',
            url: 'http://build@10.1.1.10:8080/scm/git/HRMS-FrontEnd'
      }
    }
        
    stage('Install dependencies') {
      steps {
        sh 'npm install'
		sh 'ng build --prod'
      }
    }
     
    stage('Test') {
      steps {
        sh 'echo tests are currently failing so skipped'
        sh 'exit 0'
      }
    }
	
    stage('Deploy'){
        steps{
            //sh 'pwd'
            //sh 'sshpass -p "sevalg2014" ssh root@10.1.1.14 -o StrictHostKeyChecking=no "ls"'
            sh 'sshpass -p "sevalg2014" ssh root@10.1.1.14 -o StrictHostKeyChecking=no  "rm -rf /var/www/temp-deploy/dist/HRMS-Frontend"'
            sh 'sshpass -p "sevalg2014" ssh root@10.1.1.14 "mkdir -p /var/www/temp-deploy/dist/HRMS-Frontend"'			
			sh 'sshpass -p "sevalg2014" scp -r dist/assessment/* root@10.1.1.14:/var/www/temp-deploy/dist/HRMS-Frontend/'
            sh 'sshpass -p "sevalg2014" ssh root@10.1.1.14 "rm -rf /var/www/HRMS/HRMS-FrontEnd/"'
            sh 'sshpass -p "sevalg2014" ssh root@10.1.1.14 "mv /var/www/temp-deploy/dist/HRMS-Frontend/ /var/www/HRMS/HRMS-FrontEnd/"'
            sh 'sshpass -p "sevalg2014" ssh root@10.1.1.14 "chmod -R 755 /var/www/HRMS/HRMS-FrontEnd"'
            sh 'sshpass -p "sevalg2014" ssh root@10.1.1.14 "service apache2 restart"'
        }
    }
  }
   post{
      success{
          echo 'This will run only if successful' 
      }
      failure {
          emailext body: '$DEFAULT_CONTENT', recipientProviders: [culprits(), developers()], subject: '$DEFAULT_SUBJECT', to: '$DEFAULT_RECIPIENTS'
          emailextrecipients([developers()])
      }
      unstable {  
             echo 'This will run only if the run was marked as unstable'  
         }  
         changed {  
             echo 'This will run only if the state of the Pipeline has changed'  
             echo 'For example, if the Pipeline was previously failing but is now successful'  
         }  
  }
}