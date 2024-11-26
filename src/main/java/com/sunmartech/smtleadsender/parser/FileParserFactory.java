package com.sunmartech.smtleadsender.parser;

import java.io.InputStream;

import org.apache.commons.io.FilenameUtils;

public class FileParserFactory {
	
	public static FileParser getFileParser(String file,InputStream br)
	{
		if("csv".equals(FilenameUtils.getExtension(file)))
		{
			return new CSVFileParser(br);
		}
		else if("xls".equals(FilenameUtils.getExtension(file)))
		{
			return new HSSFFileParser(br);
		} 
		else if("xlsx".equals(FilenameUtils.getExtension(file)))
		{
			return new XLSXFileParser(br);
		} 
		return null;
		
	}

}
