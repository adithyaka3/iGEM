const startTime = new Date();

const task_name = 'Random';
const email = 'xyz@iisc.ac.in';
const sequence =    'CAACTTGGGAGTCTTCCTTAATTGCTC';
const dot_bracket = '(((...((((....))))...)))...';
const number_of_structures = '5';
const destination = '~/Downloads/'
const browserType = 'chromium';  //firefox, chromium



console.log('Starting the script...');
console.log('Task Name:', task_name);
console.log('Email:', email);
console.log('Sequence:', sequence);
console.log('Dot Bracket:', dot_bracket);
console.log('Number of Structures: ', number_of_structures);
console.log('Destination:', destination,);
console.log('Browser Type:', browserType);
console.log('\n');


const { firefox, chromium } = require('playwright');

(async () => {
  
  
  const browserLauncher = browserType === 'firefox' ? firefox : chromium;

  const browser = await browserLauncher.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
    await page.goto('http://biophy.hust.edu.cn/new/3dRNA/create', { timeout: 60000 });

  // Wait for the DNA radio button to be visible and enabled
  console.log('Starting to enter data into the website...')
  const dnaRadioButton = await page.waitForSelector('label.el-radio span.el-radio__label:has-text("DNA")');
  await dnaRadioButton.click();


  // Wait for the text box to be visible and enabled
  const TaskName = await page.waitForSelector('input.el-input__inner');
  await TaskName.evaluate(element => element.value = '');
  await TaskName.type(task_name); // Type the sequence into the text box
  
  await page.keyboard.press('Tab');
  await page.keyboard.type(email); //email
  await page.keyboard.press('Tab');
  await page.keyboard.type(sequence); //sequence

  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');

  await page.keyboard.type(dot_bracket); // dot bracket notation of 2D structure

  await page.keyboard.press('Tab');

  await page.keyboard.type(number_of_structures);

  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');

  await page.keyboard.press('Enter'); 

  await page.click('div#tab-task_index');

  await page.click('button.el-button.el-button--primary.el-button--mini');
  await page.click('th.el-table_1_column_4.is-leaf.is-sortable .sort-caret.descending'); 

  await page.waitForSelector('.el-table__row');

  // Get the text content of the third column in the first row
  statusText = await page.$eval('.el-table__row:first-child .el-table_1_column_3 .cell', element => element.textContent);
  
console.log('Processing the data... \n')
while (1){
  await new Promise(resolve => setTimeout(resolve, 4000));
  await page.click('body');
  await page.click('th.el-table_1_column_4.is-leaf.is-sortable .sort-caret.descending');
  statusText = await page.$eval('.el-table__row:first-child .el-table_1_column_3 .cell', element => element.textContent);
  
  if (statusText.trim() === "Finished") {    
    break;
  } else {
    
    await page.click('body');
    await page.click('button.el-button.el-button--primary.el-button--mini');
    
  }
  
  
}

await page.click('body');
await page.click('table.el-table__body tr:first-child td:nth-child(6) .el-button--info');

console.log('Finished processing the data. \n')
await page.waitForSelector('h4.text-md-center');

  // Extract the text content of the h4 element
const h4Text = await page.$eval('h4.text-md-center', element => element.textContent.trim());
// http://biophy.hust.edu.cn/new/3dRNA/jobs/2d85bf36-3cb3-414f-8a63-5adb63d88084/download?name=pdb&id=1'

// extract the alpha-numertic string after Job from h4Text until the end of the string
const pattern = /Job\s*([\w-]+)/;
const match = h4Text.match(pattern);
const jobID = match ? match[1] : null;



const scores = await page.$$eval('table.table-bordered tbody tr td', tds => tds.map(td => td.innerText));  
  //get the index of the least score
  let minScoreIndex = 0;
  let minScore = 100;
  scores.forEach((score, index) => {
    if (score < minScore) {
      minScore = score;
      minScoreIndex = index;
    }
  });
  
  console.log(`Score ${minScoreIndex + 1}: ${minScore}`);

  
    const urlGenerated = `http://biophy.hust.edu.cn/new/3dRNA/jobs/${jobID}/download?name=pdb&id=${minScoreIndex + 1}`;
  
    const terminalCommand = 'curl \'' + urlGenerated + '\' > ' + destination + 'outputAptamer_' + (minScoreIndex + 1) + '.pdb';
  
    console.log('Command being executed: \n', terminalCommand)
  
    const { exec } = require('child_process');
    console.log('\nDownloading the file...');
    exec(terminalCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`\nError: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`\nstderr: ${stderr}`);
        return;
      }
      console.log(`\nstdout:\n${stdout}`);
    });
  
  

  console.log('Closing the browser...');
  await browser.close();
  console.log('Output will be available at:', destination);

const endTime = new Date();
const timeDifference = endTime - startTime;
const hours = Math.floor(timeDifference / (1000 * 60 * 60));
const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

// I need to create an output log file which has all the information that is printed on the console
// the output log file should be saved in the same directory as the pdb files
// the output log file should be named as output_log_<jobID>.txt



console.log(`Time taken to complete the process: ${hours} hrs ${minutes} mins ${seconds} secs`);

})();
