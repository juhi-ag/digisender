package com.sunmartech.smtleadsender.parser;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

import com.monitorjbl.xlsx.StreamingReader;

public class XLSXFileParser extends FileParser {
	
	final static Logger logger = LogManager.getLogger(XLSXFileParser.class);
	
	InputStream inStream = null;

	Workbook workbook = null;
	Sheet sheet = null;
	String header[] = null;
	List<String[]> rows = null;
	int size;
	
	public final static int CELL_TYPE_STRING = 1;
	public final static int CELL_TYPE_ERROR = 5;

	public XLSXFileParser(InputStream inStream) {
		this.inStream = inStream;
		try {
			this.size = inStream.available();
			workbook = StreamingReader.builder()   
			          .sstCacheSize(100)    
			          .open(inStream);    
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
					switch(cell.getCellType()) {
						case ERROR:
							try {
								String errorValue = cell.getStringCellValue();
								
								if(StringUtils.isNotBlank(errorValue)) {
									errorValue = errorValue.substring(errorValue.indexOf(":")+1, errorValue.length());
									errorValue = errorValue.trim();
									
									if(errorValue.equalsIgnoreCase(ErrorConstants.getText(ErrorConstants.ERROR_DIV_0))) {
										rowval.add("#DIV/0!");
								    	break;
									}
									else if(errorValue.equalsIgnoreCase(ErrorConstants.getText(ErrorConstants.ERROR_NA))) {
										rowval.add("#N/A");
								    	break;
									}
									else if(errorValue.equalsIgnoreCase(ErrorConstants.getText(ErrorConstants.ERROR_NAME))) {
										rowval.add("#NAME?");
								    	break;
									}
									else if(errorValue.equalsIgnoreCase(ErrorConstants.getText(ErrorConstants.ERROR_NULL))) {
										rowval.add("#NULL!");
								    	break;
									}
									else if(errorValue.equalsIgnoreCase(ErrorConstants.getText(ErrorConstants.ERROR_NUM))) {
										rowval.add("#NUM!");
								    	break;
									}
									else if(errorValue.equalsIgnoreCase(ErrorConstants.getText(ErrorConstants.ERROR_REF))) {
										rowval.add("#REF!");
								    	break;
									}
									else if(errorValue.equalsIgnoreCase(ErrorConstants.getText(ErrorConstants.ERROR_VALUE))) {
										rowval.add("#VALUE!");
								    	break;
									}
								}
							}
							catch(Exception e) {
								logger.info("Exception occured while fetching error value from file:"+e);
								rowval.add("");
								break;
							}
						case STRING:
							if(StringUtils.isNotBlank(cell.getStringCellValue()) && cell.getStringCellValue().equalsIgnoreCase("null")) {
								String cellValue = cell.getStringCellValue();
								cellValue = cellValue.replace("null", "");
								rowval.add(cellValue);
								break;
							}
						default:
							rowval.add(dataFormatter.formatCellValue(cell));
							break;
						
					}
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
