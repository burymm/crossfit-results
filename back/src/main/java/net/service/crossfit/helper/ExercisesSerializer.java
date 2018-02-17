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
import net.service.testcrossfitresult.entity.Exercises;

/**
 *
 * @author andrey
 */
public class ExercisesSerializer implements JsonSerializer<Exercises>{

    @Override
    public JsonElement serialize(Exercises exercises, Type type, JsonSerializationContext jsc) {
        JsonObject jo = new JsonObject();
        
        jo.addProperty("id", exercises.getId());
        jo.addProperty("name", exercises.getName());
        jo.addProperty("description", exercises.getDescription());
        
        return jo;
    }
    
}
