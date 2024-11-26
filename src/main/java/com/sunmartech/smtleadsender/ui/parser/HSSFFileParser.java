package com.sunmartech.smtleadsender.ui.parser;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;

public class HSSFFileParser extends FileParser {

	InputStream inStream = null;

	HSSFWorkbook workbook = null;
	HSSFSheet sheet = null;
	String header[] = null;
	List<String[]> rows = null;
	int size ;

	public HSSFFileParser(InputStream inStream) {
		this.inStream = inStream;
		try {
			this.size = inStream.available();
			workbook = new HSSFWorkbook(inStream);
			//FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();
			rows= new ArrayList<String[]>();
			init();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void init() {
		sheet = workbook.getSheetAt(0);

		DataFormatter dataFormatter = new DataFormatter();
		if (sheet != null) {
			boolean isheader = true;
			int colCount = 0 ;
			for (Row row : sheet) {
				ArrayList<String> rowval = new ArrayList<String>();
				if (isheader){
					colCount = row.getLastCellNum();
				}
				for (int cn=0; cn<colCount; cn++) {
					
					Cell cell = row.getCell(cn, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
					//rowval.add(dataFormatter.formatCellValue(cell).toLowerCase());
					rowval.add(dataFormatter.formatCellValue(cell));
				}
				String[] array = rowval.toArray(new String[rowval.size()]);
				
				int blankRowSize = 0;
				for(int i=0; i<array.length; i++) {
					if(array[i] != null && array[i] != "") {
						break;
					}
					else {
						blankRowSize++;
					}
				}
				if(blankRowSize != array.length) {
					if(isheader)
					{
						header=array;
						isheader = false;
					}
					else
					{
						rows.add(array);
					}
				}
			}
		}
	}

	@Override
	public List<String[]> readData(String[] fileColNams) throws IOException {
		// TODO Auto-generated method stub
		return rows;
	}

	@Override
	public String[] readFirstLine() throws IOException {
		// TODO Auto-generated method stub
		return header;
	}

	public List<String[]> readCsfData(int colNameIndex, int colParentIndex) throws IOException {
		return rows;
	}

	public String[] readCsfLines(int colNameIndex, int colParentIndex) throws IOException {
		return header;
	}

	public int getSize() {
		return size;
	}

/*	@Override
	public List<String[]> readLines(String[] fileColNams) throws IOException {
		// TODO Auto-generated method stub
		return null;
	}*/

}
