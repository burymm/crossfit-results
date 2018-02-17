/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.service.testcrossfitresult.helper;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import java.lang.reflect.Type;
import net.service.testcrossfitresult.entity.WorkoutType;

/**
 *
 * @author andrey
 */
public class WorkoutSerializer implements JsonSerializer<WorkoutType> {

    @Override
    public JsonElement serialize(WorkoutType wt, Type type, JsonSerializationContext jsc) {
        
        JsonObject jo = new JsonObject();
        
        jo.addProperty("id", wt.getId());
        jo.addProperty("name", wt.getName());
        jo.addProperty("description", wt.getDescription());
        
        return jo;
    }
    
    
    
}
