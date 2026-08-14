import { test, expect, request } from '@playwright/test';
const ExcelJS = require('exceljs');

async function excelTest(searchText,replaceText,change,FilePath)
{
    
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(FilePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    
    const cordinates = await readExcel(worksheet,searchText);

    const cell = worksheet.getCell(cordinates.row,cordinates.column+change.columnChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(FilePath);
}

async function readExcel(worksheet,searchText) 
{
    let cordinates = {row:-1,column:-1};
    worksheet.eachRow((row,rowNumber) =>
    {
        row.eachCell((cell,colNumber) =>
        {
            //console.log(cell.value); print all values
            if(cell.value === searchText)
            {
                console.log('RowNumber : ',rowNumber);
                console.log('ColumnNumber : ',colNumber);
                cordinates.row = rowNumber;
                cordinates.column = colNumber;
            }
        });
    })
    return cordinates;
}

//excelTest("Mango",350,{rowChange:0,columnChange:2},"C:\\Users\\Dhaval\\Downloads\\Exceldownload_test.xlsx");
test('Download Upload Excel Files', async ({page}) =>
{
    const textSearch = "Mango";
    const textReplace = 350;
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;
    /*
    console.log(await download.path());
    console.log(await download.suggestedFilename());
    const filepath = "C:\\Users\\Dhaval\\Downloads\\download.xlsx";
    
    */
    const filepath = test.info().outputPath(download.suggestedFilename());
    await download.saveAs(filepath);
    
    await excelTest(textSearch,textReplace,{rowChange:0,columnChange:2},filepath);    
    //attribut must be type="file" to use setInputFiles method
    await page.locator('#fileinput').setInputFiles(filepath); 
    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has: textLocator});
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(textReplace.toString());
})