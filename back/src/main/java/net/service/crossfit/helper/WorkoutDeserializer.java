
package net.service.testcrossfitresult.helper;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import java.lang.reflect.Type;
import net.service.testcrossfitresult.entity.WorkoutType;

public class WorkoutDeserializer implements JsonDeserializer<WorkoutType> {

    @Override
    public WorkoutType deserialize(JsonElement je, Type type, JsonDeserializationContext jdc) throws JsonParseException {
        
        JsonObject json = je.getAsJsonObject();
        WorkoutType workType = new WorkoutType();
        
        workType.setId(json.get("id").getAsInt());
        workType.setName(json.get("name").getAsString());
        workType.setDescription(json.get("description").getAsString());
        
        return workType;
    }
    
    
    
}
