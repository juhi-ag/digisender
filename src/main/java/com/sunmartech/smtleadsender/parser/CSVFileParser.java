package com.sunmartech.smtleadsender.parser;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

import com.Ostermiller.util.ExcelCSVParser;

public class CSVFileParser extends FileParser {

	BufferedReader br = null;
	InputStream in = null;
	int size ;

	public CSVFileParser(InputStream inStream)

	{
		try {
			this.size = inStream.available();
			br = new BufferedReader(new InputStreamReader(inStream, StandardCharsets.UTF_8));
			
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public List<String[]> readData(String[] fileColNams) throws IOException {
		List<String[]> columnValues = readLines(fileColNams);
		return columnValues;
	}

	public String[] readFirstLine() throws IOException {
		String line = br.readLine();
		return convertStringToArray(line.toLowerCase());
	}

	public List<String[]> readLines(String[] fileColNams) throws IOException {
		List<String[]> l = new LinkedList<>();
		String[] line = null;

		ExcelCSVParser excelCSVParser = new ExcelCSVParser(br);
		while ((line = excelCSVParser.getLine()) != null) {
			l.add(line);
		}
		return l;
	}

	private String[] convertStringToArray(String line) {

		String arr[] = line.split(",", -1);
		return arr;

	}

	public String[] mergeArraysOfSameTypes(String[] a, String[] b) {
		int size = a.length + b.length;
		String[] c = new String[size];
		for (int i = 0; i < a.length; i++) {
			c[i] = a[i];
		}

		int j = 0;
		for (int i = a.length; i < size; i++) {
			c[i] = b[j];
			j = j + 1;
		}
		return c;
	}

	public Object[] mergeArraysOfDifferentTypes(String[] a, Object[] b) {
		int size = a.length + b.length;
		Object[] c = new Object[size];
		for (int i = 0; i < a.length; i++) {
			c[i] = a[i];
		}

		int j = 0;
		for (int i = a.length; i < size; i++) {
			c[i] = b[j];
			j = j + 1;
		}
		return c;
	}

	public Object[] mergeArraysOfObjectTypes(Object[] a, Object[] b) {
		int size = a.length + b.length;
		Object[] c = new Object[size];
		for (int i = 0; i < a.length; i++) {
			c[i] = a[i];
		}

		int j = 0;
		for (int i = a.length; i < size; i++) {
			c[i] = b[j];
			j = j + 1;
		}
		return c;
	}
	
	public List<String[]> readCsfData(int colNameIndex, int colParentIndex) throws IOException {
		List<String[]> columnValues = readCsfLines(colNameIndex, colParentIndex);
		return columnValues;
	}

	public List<String[]> readCsfLines(int colNameIndex, int colParentIndex) throws IOException {
		List<String[]> l = new LinkedList<>();
		String[] line = null;

		ExcelCSVParser excelCSVParser = new ExcelCSVParser(br);
		while ((line = excelCSVParser.getLine()) != null) {
			String nameValue = Arrays.asList(line).get(colNameIndex);
			line[colNameIndex] = nameValue;
			
			if(colParentIndex >= 0) {
				String parentValue = Arrays.asList(line).get(colParentIndex);
				line[colParentIndex] = parentValue;
			}
			l.add(line);
		}
		return l;
	}
	
	public int getSize() {
		return size;
	}

}
