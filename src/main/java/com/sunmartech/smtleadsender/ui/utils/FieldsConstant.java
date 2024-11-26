package com.sunmartech.smtleadsender.ui.utils;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

import com.sunmartech.smtleadsender.ui.schema.ClientSmtrawdata;

public interface FieldsConstant
{
    Map<String, String> deliveryFields = new HashMap<String, String>();

    public static Map<String, String> getDeliveryFields()
    {
        if (deliveryFields.isEmpty())
        {
            for (Field field : ClientSmtrawdata.class.getDeclaredFields())
            {
            	deliveryFields.put(field.getName(), field.getType().getSimpleName());
            }
        }
        return deliveryFields;
    }
    
}
