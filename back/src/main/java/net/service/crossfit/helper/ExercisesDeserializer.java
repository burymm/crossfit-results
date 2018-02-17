package net.service.testcrossfitresult.helper;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import java.lang.reflect.Type;
import net.service.testcrossfitresult.entity.Exercises;

public class ExercisesDeserializer implements JsonDeserializer<Exercises> {

    @Override
    public Exercises deserialize(JsonElement je, Type type, JsonDeserializationContext jdc) throws JsonParseException {

        Exercises exercises = new Exercises();
        JsonObject json = je.getAsJsonObject();

        exercises.setId(json.get("id").getAsInt());
        exercises.setName(json.get("name").getAsString());
        exercises.setDescription(json.get("description").getAsString());

        return exercises;

    }

}
