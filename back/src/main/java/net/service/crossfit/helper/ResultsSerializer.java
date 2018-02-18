package net.service.testcrossfitresult.helper;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import net.service.testcrossfitresult.entity.Results;

public class ResultsSerializer implements JsonSerializer<Results> {

    @Override
    public JsonElement serialize(Results results, Type type, JsonSerializationContext jsc) {

        JsonObject jo = new JsonObject();

        jo.addProperty("id", results.getId());
        jo.addProperty("userId", results.getUserId());
        jo.addProperty("comment", results.getComment());
        jo.addProperty("result", results.getResult());

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");
        if (results.getWorkoutDate() != null) {
            jo.addProperty("workoutDate", dateFormat.format(results.getWorkoutDate()));
        } else {
            jo.addProperty("workoutDate", "00.00.0000");
        }

        jo.add("workoutType", jsc.serialize(results.getWorkoutType()));
        jo.add("workoutExercise", jsc.serialize(results.getExercises()));
//        
        return jo;
    }

}
