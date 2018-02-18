package net.service.crossfit.rs;

import java.util.Set;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("webservice")
public class RSApplication extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        try {
            Class jsonProvider = Class.forName("org.glassfish.jersey.jackson.JacksonFeature");
            resources.add(jsonProvider);
        } catch (ClassNotFoundException e) {
            java.util.logging.Logger.getLogger(getClass().getName()).log(java.util.logging.Level.SEVERE,null,e);
        }
        
        addRestResourceClasses(resources);
        return resources;
    }
    
        private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(net.service.crossfit.rs.ExercisesResource.class);
        resources.add(net.service.crossfit.rs.ResultsResource.class);
    
    }
}
