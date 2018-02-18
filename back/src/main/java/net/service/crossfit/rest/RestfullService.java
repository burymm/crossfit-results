package net.service.testcrossfitresult.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import net.service.testcrossfitresult.helper.JSONHelper;
import net.service.testcrossfitresult.entity.Results;
import net.service.testcrossfitresult.service.GenericService;

@Path("/results")
public class RestfullService {
    
    private final JSONHelper helper;
    private GenericService gs;
    
    public RestfullService() {        
        helper = new JSONHelper(Results.class);
    }
    
    @GET
    @Path("hello")
    @Produces(MediaType.TEXT_PLAIN)
    public String sayHello() {
        return "Hello";
    }
    
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Response getResults() {        
        return Response.ok(helper.getEntityAll()).build();
    }
    
    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public String getResultsById(@PathParam("id") int id) {
        return helper.getEntityById(id);
    }
    
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public Response createResults(String data) {
        helper.createEntity(data);
        return Response.status(200).entity(gs).build();
    }
    
    @PUT
    @Consumes({MediaType.APPLICATION_JSON})
    public Response updateResults(String data) {
        helper.updateEntity(data);
        return Response.status(200).entity(gs).build();
    }
    
    @DELETE
    @Consumes({MediaType.APPLICATION_JSON})
    public Response removeResults(String data) {
        helper.removeEntity(data);
        return Response.status(200).entity(gs).build();
    }
    
}
