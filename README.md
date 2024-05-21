# DOCUMENTATION TO USE TOOL:

1. Ensure node js and playwright are installed on the computer.
    
    `sudo apt update`
    
    `sudo apt install nodejs`
    
    Verify the installation by typing
    
    `node -v & npm -v`
    
    If an error message comes of this form:
    `bash: /usr/bin/npm: No such file or directory`
    
    Run this command : `hash -r`
    
    Now verify the installation again. Now it should work !
    
    `npm install playwright`
    
    `npx playwright install`
    
    We have finished the setup of npm successfully !
    

1. Execute this command in the terminal
    
    `cd Downloads
     git clone https://github.com/adithyaka3/iGEM.git`
    
    These commands will copy the files into an iGEM directory 
    
    
2. Once you have the file on your computer, open xiaoWebApi.js using a text editor or an IDE of your choice.

   
3. You should be able to see these initial parameters in the file. All of these have to be set according to the users choice. Since we are only dealing with DNA modelling as of now, we wouldn’t have to configure any other settings.
    
    ![image](https://github.com/adithyaka3/iGEM/assets/143578987/74c59504-2c52-4e0c-a832-4439c605a399)

    
    Task Name: It is used to identify the task by allotting it with a specific ID
    
    Email: An email ID when provided will send an email notification to you regarding the success or failure of the process.
    
    Number Of Structures: number of pdb files which will be generated
    
    destination : this path will be where all the output pdb files and output log files are generated. **Always Ensure that the last directory end with a ‘/’**
    
    browser type: currently supported only for google chrome and firefox. For google chrome, the browserType is chromium.
    
5. Once all the parameters are set, we can run the api file using the following command.
    
    `node xiaoWebApi.js`
    
    The output will all be in the terminal itself and there will be no separate log file generated. So please look into the terminal for any info regarding the process. Also the browser will not be displayed to the user so that the user doesn’t interfere with the process.
