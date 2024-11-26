package com.sunmartech.smtleadsender.ui.parser;

import java.io.IOException;
import java.util.List;

public abstract class FileParser {

	public abstract List<String[]> readData( String[] fileColNams) throws IOException;
	
	public abstract List<String[]> readCsfData(int nameIndex, int colParentIndex) throws IOException;

	public abstract String[] readFirstLine() throws IOException;

	public abstract int getSize() throws IOException;


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

}
