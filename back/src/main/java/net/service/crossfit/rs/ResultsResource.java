package net.service.crossfit.rs;

import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import net.service.crossfit.session.ResultsFacade;
import net.service.crossfit.entity.Results;

@Stateless
@Path("/results")
public class ResultsResource {

    @EJB
    ResultsFacade resultsFacade;

    @GET
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public List<Results> getResults() {
        return resultsFacade.findAll();
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Results getResultById(@PathParam("id") int id) {
        return resultsFacade.find(id);
    }

    @GET
    @Path("count")
    @Produces({MediaType.APPLICATION_JSON})
    public String getCount() {
        return String.valueOf(resultsFacade.count());
    }

    @PUT
    @Consumes({MediaType.APPLICATION_JSON})
    public void update(Results entity) {
        resultsFacade.edit(entity);
    }
    
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public void created(Results entity) {
        resultsFacade.create(entity);
    }
    
    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") int id) {
        resultsFacade.remove(resultsFacade.find(id));
    }
    

}
