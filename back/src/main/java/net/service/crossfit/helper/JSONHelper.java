package net.service.testcrossfitresult.helper;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSyntaxException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.service.testcrossfitresult.entity.Exercises;
import net.service.testcrossfitresult.entity.Results;
import net.service.testcrossfitresult.entity.WorkoutType;
import net.service.testcrossfitresult.service.GenericService;

public class JSONHelper<T> {

    private final GenericService gs;
    private final Gson gson;
    private final Class<T> type;

    public JSONHelper(Class<T> type) {
        this.type = type;
        gs = new GenericService(type);
        gson = new GsonBuilder()
                .setPrettyPrinting()
                .excludeFieldsWithoutExposeAnnotation()
                .registerTypeAdapter(Results.class, new ResultsSerializer())
                .registerTypeAdapter(WorkoutType.class, new WorkoutSerializer())
                .registerTypeAdapter(Exercises.class, new ExercisesSerializer())
                .registerTypeAdapter(Results.class, new ResultsDeseriallizer())
                .create();
    }
    
    public Class<T> getType() {
        return type;
    }

    public String getEntityAll() {

        List<T> resultsList = null;

        try {
            resultsList = new ArrayList<>(gs.findAll());
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return gson.toJson(resultsList);
    }

    public String getEntityById(int id) {
        T entity = null;
        try {
            entity = (T) gs.findById(id);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return gson.toJson(entity);
    }
    
    public void createEntity(String data) {
        try {
            T entity = gson.fromJson(data, type);
            gs.add(entity);
        } catch (JsonSyntaxException | SQLException e) {
            e.printStackTrace();
        }
    }
    
    public void updateEntity(String data) {

        try {
            T entity = gson.fromJson(data, type);
            gs.update(entity);
        } catch (JsonSyntaxException | SQLException e) {
            e.printStackTrace();
        }
    
    }
    
    public void removeEntity(String data) {
        try {
            T entity = gson.fromJson(data, type);
            gs.remove(entity);
        } catch (JsonSyntaxException | SQLException e) {
            e.printStackTrace();
        }
    }

}
